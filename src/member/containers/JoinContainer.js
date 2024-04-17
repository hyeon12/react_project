import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import JoinForm from '../components/JoinForm';

const JoinContainer = () => {
  // 양식 데이터
  const [form, setForm] = useState({
    agree: false,
  });

  // 양식 항목별 에러 메세지
  const [errors, setErrors] = useState({});

  const { t } = useTranslation();

  const navigate = useNavigate();

  /**
   * 회원 가입 처리
   *
   * 1. 데이터 검증
   *    1) 필수 항목 검증 - 이메일, 비밀번호, 비밀번호 확인, 회원명, 약관동의
   *    2) 이메일 중복 여부, 이메일 형식 체크
   *    3) 비밀번호 복잡성 체크(최소자릿수, 대소문자/특수문자)
   *    4) 비밀번호와 비밀번호 확인 일치 여부
   *
   *
   * 2. 가입 처리 - 영구 저장 DB
   * 3. 로그인 페이지 이동
   */

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const _errors = {};
      let hasErrors = false; //에러 유무 체크

      /* 데이터 검증 - 필수항목 체크 S */
      const requiredFields = {
        email: t('이메일을_입력하세요.'),
        password: t('비밀번호를_입력하세요.'),
        confirmPassword: t('비밀번호를_확인하세요.'),
        name: t('회원명을_입력하세요.'),
        agree: t('회원가입_약관에_동의하세요.'),
      };

      for (const [field, msg] of Object.entries(requiredFields)) {
        // !form[field] - null, undefined, '' 체크, !form[field].trim() - ' ' 체크(공백만 있는 경우)
        if (!form[field] || (form[field] && !form[field].trim())) {
          _errors[field] = _errors[field] || [];
          _errors[field].push(msg);
          hasErrors = true; //error가 있을때는 true
        }
      }

      /* 데이터 검증 - 필수항목 체크 E */

      /* 데이터 검증 - 비밀번호와 비밀번호 확인 일치 여부 */
      if (
        form.password &&
        form.confirmPassword &&
        form.password !== form.confirmPassword
      ) {
        _errors.confirmPassword = _errors.confirmPassword || [];
        _errors.confirmPassword.push(t('비밀번호가_정확하지_않습니다.'));
        hasErrors = true; //error가 있을때는 true
      }

      setErrors(_errors); // 데이터 검증 상태값 업데이트

      if (hasErrors) {
        //검증 실패시 가입처리X
        return; // 실행종료
      }

      /* 가입처리 (error 없을때) */

      /* 가입완료 후 로그인 페이지로 이동*/
      navigate('/member/login', { replace: true }); //replace: true -> 방문기록X (뒤로가기 했을때 ,,, 데이터 이중처리 현상 방지!!)
    },
    [t, form, navigate],
  );

  const onChange = useCallback((e) => {
    const name = e.target.name;
    const value = e.target.value.trim();
    setForm((form) => ({ ...form, [name]: value }));
  }, []);

  const onToggle = useCallback(() => {
    setForm((form) => ({ ...form, agree: !form.agree }));
  }, []);

  const onReset = useCallback(() => setForm({ agree: false }), []);

  return (
    <JoinForm
      form={form}
      errors={errors}
      onSubmit={onSubmit}
      onChange={onChange}
      onToggle={onToggle}
      onReset={onReset}
    />
  );
};

export default React.memo(JoinContainer);
