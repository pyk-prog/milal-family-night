// 조기 마감하면 true로 바꾸고 구글폼의 응답 접수도 닫으세요.
const closedEarly = false;
const now = Date.now();
const closed = closedEarly || now >= Date.parse("2026-12-01T00:00:00+09:00");
if (closed) {
  const link = document.querySelector("#apply-link");
  const eventDay = now >= Date.parse("2026-12-08T00:00:00+09:00") && now < Date.parse("2026-12-09T00:00:00+09:00");
  const message = "신청이 마감되었습니다. 12월 3일(목)에 밴드·홈페이지 발표 및 개별 문자로 선정 결과를 안내합니다.";
  if (link) {
    link.href = eventDay ? document.querySelector("#visit a").href : "#apply";
    link.textContent = eventDay ? "영화관 길찾기" : "선정 안내 보기";
    document.querySelector(".deadline").textContent = message;
  }
  const form = document.querySelector("#form-area");
  if (form) {
    form.hidden = true;
    document.querySelector("#notice").textContent = message;
  }
}

const form = document.querySelector("#form-area");
const companion = document.querySelector("#companion");
function syncFields() {
  const people = [...companion.querySelectorAll("input[type=checkbox]")];
  const full = people.filter(input => input.checked).length >= 2;
  for (const input of people) input.disabled = full && !input.checked;
  for (const input of form.querySelectorAll("[data-other]")) {
    const selected = form.elements[input.dataset.other].value === "__other_option__";
    input.disabled = !selected;
    input.required = selected;
  }
}
form.addEventListener("change", syncFields);
window.addEventListener("pageshow", syncFields);
syncFields();

const startTime = Date.parse("2026-12-08T18:30:00+09:00");
const endTime = Date.parse("2026-12-08T21:30:00+09:00");
const clock = document.querySelector("#clock");
const digits = clock.querySelectorAll("b");
function renderClock() {
  const now = Date.now();
  if (now >= startTime) {
    clock.textContent = now >= endTime ? "행사가 종료되었습니다." : "행사가 시작되었습니다.";
    clock.classList.add("event-status");
  } else {
    const seconds = Math.ceil((startTime - now) / 1000);
    const values = [Math.floor(seconds / 86400), Math.floor(seconds / 3600) % 24,
      Math.floor(seconds / 60) % 60, seconds % 60];
    values.forEach((value, index) => {
      const number = String(value).padStart(2, "0");
      if (digits[index].textContent !== number) digits[index].textContent = number;
    });
  }
  clock.hidden = false;
  if (now < endTime) setTimeout(renderClock, now < startTime ? 1000 - now % 1000 : endTime - now);
}
renderClock();
