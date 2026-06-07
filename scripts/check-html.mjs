// HTML/JS 정적 검증 스크립트
// - 저장소 내 모든 .html 파일을 검사
// - 기본 HTML 구조 점검(<!DOCTYPE>, <html> 태그 균형)
// - 내장 <script> 블록의 JavaScript 문법 검사 (vm.Script로 "파싱만", 실행하지 않음)
//
// 문제가 하나라도 있으면 비정상 종료 코드(1)로 끝나 CI가 실패합니다.

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import vm from 'node:vm';

// 재귀적으로 .html 파일 수집 (node_modules / .git 제외)
function findHtmlFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    if (entry === '.git' || entry === 'node_modules') continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...findHtmlFiles(full));
    } else if (entry.endsWith('.html')) {
      out.push(full);
    }
  }
  return out;
}

const files = findHtmlFiles('.');
if (files.length === 0) {
  console.error('✗ 검사할 .html 파일을 찾지 못했습니다.');
  process.exit(1);
}

let errors = 0;

for (const file of files) {
  const html = readFileSync(file, 'utf8');

  // 1) 기본 HTML 구조
  if (!/<!DOCTYPE html>/i.test(html)) {
    console.error(`✗ ${file}: <!DOCTYPE html> 선언이 없습니다.`);
    errors++;
  }
  const open = (html.match(/<html[\s>]/gi) || []).length;
  const close = (html.match(/<\/html>/gi) || []).length;
  if (open !== close) {
    console.error(`✗ ${file}: <html> 태그 불균형 (열림 ${open} / 닫힘 ${close})`);
    errors++;
  }

  // 2) 내장 <script> 블록 JS 문법 검사 (src 외부 스크립트는 본문이 비어 통과)
  const blocks = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)];
  blocks.forEach(([, code], i) => {
    if (!code.trim()) return; // 빈/외부 스크립트는 건너뜀
    try {
      // 컴파일(파싱)만 수행하고 실행하지 않으므로 document 등 브라우저 API가 필요 없음
      new vm.Script(code, { filename: `${file}#script[${i}]` });
      console.log(`✓ ${file} script[${i}] JS 문법 OK`);
    } catch (e) {
      console.error(`✗ ${file} script[${i}] JS 문법 오류: ${e.message}`);
      errors++;
    }
  });
}

if (errors > 0) {
  console.error(`\n검증 실패: 문제 ${errors}건`);
  process.exit(1);
}
console.log('\n모든 검증 통과 ✓');
