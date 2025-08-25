import React, { useEffect, useMemo, useState } from 'react';
import useModeStore from '../stores/useModeStore';
import { postAccount } from '../apis/accounts';

import SignUpPage1 from './SignUpPage1';
import SignUpPage2 from './SignUpPage2';
import OnBoardingSelect from './OnBardingSelect';
import NeighborhoodSettingsPage from './NeighborhoodSettingsPage';
import FounderTarget from './FounderTarget';
import FounderTime from './FounderTime';
import LodingPage from './LodingPage';
import WelcomePage from './WelcomePage';
import userEvent from '@testing-library/user-event';

function SignUpIndex() {
  const { isProposerMode } = useModeStore(); // true=제안자, false=창업자
  const [currentStep, setCurrentStep] = useState(0);
  const [signupData, setSignupData] = useState({}); //입력받은 데이터 저장하기

  useEffect(async () => {
    if (currentStep == steps.length - 2) {
      try {
        const response = await postAccount();
      } catch (error) {}
      return <LodingPage />;
    }
  }, [currentStep]);

  // 모드 바뀌면 단계 시퀀스 재생성
  const steps = useMemo(() => {
    return isProposerMode
      ? [
          SignUpPage1,
          SignUpPage2,
          OnBoardingSelect,
          NeighborhoodSettingsPage,
          WelcomePage, // 제안자는 여기서 끝
        ]
      : [
          SignUpPage1,
          SignUpPage2,
          OnBoardingSelect,
          NeighborhoodSettingsPage,
          FounderTarget, // 창업자만
          FounderTime, // 창업자만
          WelcomePage,
        ];
  }, [isProposerMode]);

  const goToNextStep = (payload) => {
    if (payload && typeof payload === 'object') {
      setSignupData((prev) => ({ ...prev, ...payload })); //기존 값 유지 + 새로운 값 덮어쓰기
    }
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };
  const Current = steps[currentStep];
  return <Current onNextStep={goToNextStep} data={signupData} />;
}

export default SignUpIndex;
