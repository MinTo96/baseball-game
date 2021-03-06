// DOM 요소 가져오기
const userInput = document.querySelector(".user-input");
const userInputBtn = document.querySelector(".input-btn");
const resultParagraph = document.querySelector(".result-paragraph");
const resultContent = document.querySelector(".result-content");

// 진행 상황을 저장할 전역 객체 선언
const resultScore = {
  strike: 0,
  ball: 0,
};

// 화면 로딩시 자동으로 3개의 서로다른 1에서 9까지 숫자를 반환하는 함수
const randomNum = () => {
  let firstNumArray = [];

  while (firstNumArray.length < 3) {
    let randNum = Math.floor(Math.random() * 9 + 1);
    isOverlap(firstNumArray, randNum);
  }

  return firstNumArray;
};

// 입력된 값이 중복인지 아닌지 판단하는 함수
const isOverlap = (firstNumArray, randNum) => {
  if (firstNumArray.indexOf(randNum) === -1) {
    firstNumArray.push(randNum);
  }
};

const resultValue = randomNum();
console.log(resultValue);

// 클릭 이벤트 콜백 함수
const handleClickEvent = () => {
  const changeArray = makeArray(userInput.value).map((item) => parseInt(item));

  // Error 처리
  handleTypeError();
  handleCountError();
  handleDifError();

  // 야구게임 로직
  compareResult(changeArray);

  // 야구게임 결과 표시
  deleteBeforeComponent();
  makeResultComponent();

  initialResult();
};

// 전역 객체를 초기화 하는 함수
const initialResult = () => {
  resultScore.strike = 0;
  resultScore.ball = 0;
};

// 전달받은 문자를 배열로 변환하는 함수
const makeArray = (string) => {
  return string.split("");
};

// 타입 에러 처리 (정수가 아닌경우)
const handleTypeError = () => {
  const changeType = parseInt(userInput.value);
  if (isNaN(changeType)) {
    userInput.value = "";
    throw "정수가 아닙니다.";
  }
};

// 입력받은 값 에러 처리 (3자리를 입력하지 않은경우)
const handleCountError = () => {
  if (userInput.value.length !== 3) {
    userInput.value = "";
    throw "세자리 숫자를 입력해주세요.";
  }
};

// 입력받은 값 서로 다른 값인지 판단
const handleDifError = () => {
  const inputArray = makeArray(userInput.value).map((item) => parseInt(item));
  if (inputArray[0] === inputArray[1]) {
    userInput.value = "";
    throw "서로 다른 값을 입력해주세요.";
  } else if (inputArray[0] === inputArray[2]) {
    userInput.value = "";
    throw "서로 다른 값을 입력해주세요.";
  } else if (inputArray[1] === inputArray[2]) {
    userInput.value = "";
    throw "서로 다른 값을 입력해주세요.";
  }
};

// 야구 게임 로직 처리
const compareResult = (changeArray) => {
  firstLoop(changeArray);
};

const firstLoop = (changeArray) => {
  for (let i = 0; i < 3; i++) {
    secondLoop(i, changeArray);
  }
};

const secondLoop = (i, changeArray) => {
  for (let j = 0; j < 3; j++) {
    isValue(i, j, changeArray);
  }
};

const isValue = (i, j, changeArray) => {
  if (resultValue[i] === changeArray[j]) {
    isIndex(i, j);
  }
};

const isIndex = (i, j) => {
  if (i === j) {
    resultScore.strike = resultScore.strike + 1;
  } else {
    resultScore.ball = resultScore.ball + 1;
  }
};

// 야구 결과 표시
const makeResultComponent = () => {
  if (resultScore.strike > 0 && resultScore.ball > 0) {
    showStrikeResult();
    showBallResult();
  } else if (resultScore.strike > 0) {
    showStrikeResult();
  } else if (resultScore.ball > 0) {
    showBallResult();
  } else {
    showNothingReuslt();
  }
  // 정답을 맞췄을 때 함수 호출
  if (resultScore.strike === 3) {
    setGame();
  }
};

// 스트라이크 결과 표시
const showStrikeResult = () => {
  const result = `${resultScore.strike}스트라이크`;
  resultParagraph.append(result);
  userInput.value = "";
};

// 볼 결과 표시
const showBallResult = () => {
  const result = `${resultScore.ball}볼`;
  resultParagraph.append(result);
  userInput.value = "";
};

// 낫싱 결과 표시
const showNothingReuslt = () => {
  const result = "낫싱";
  resultParagraph.append(result);
  userInput.value = "";
};

// 전에 표시한 결과 지우기
const deleteBeforeComponent = () => {
  resultParagraph.innerHTML = "";
};

//정답 표시와 게임 종료 메세지 호출 함수
const setGame = () => {
  resultContent.innerHTML = `3개의 숫자를 모두 맞히셨습니다.! 게임종료`;
};

// 확인 버튼시 클릭 이벤트 처리
userInputBtn.addEventListener("click", handleClickEvent);
