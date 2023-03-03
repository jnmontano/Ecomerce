import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, userLogOut } from "../store/slice/userInfo.slice";

const Login = () => {
  const { register, handleSubmit, reset } = useForm();
  const {
    token,
    user: { firstName, lastName },
  } = useSelector((store) => store.userInfo);

  const dispatch = useDispatch();

  const submit = (data) => {
    dispatch(loginUser(data));
    reset({
      email: "",
      password: "",
    });
  };

  const handleLogOut = () => {
    dispatch(userLogOut());
  };
// console.log(token)
  return (
    <main className="login">
      {token ? (
        <section className="login__logged__container">
          <i className="bx bxs-user-circle"></i>
          <h3 className="login__logged__name">
            {firstName} {lastName}
          </h3>
          <button className="login__logged__btn" onClick={handleLogOut}>Log out</button>
        </section>
      ) : (
        <form className="login__form__container" onSubmit={handleSubmit(submit)}>
          <h3 className="login__form__title">Welcome! Enter your email and password to continue</h3>
          
          <div className="login__form__containerTest">
            <h4 className="login__form__titleTest">Test Data</h4>
            <div className="login__form__emailTest">
              <i className="bx bx-envelope"></i>john@gmail.com
            </div>
            <div className="login__form__passwordTest">
              <i className="bx bx-lock-alt"></i>john1234
            </div>
          </div>

          <div className="login__form__divInfo">
            <label className="login__form__label" htmlFor="">Email</label>
            <input className="login__form__input" type="text" {...register("email")} />
          </div>
          <div className="login__form__divInfo">
            <label className="login__form__label" htmlFor="">Password</label>
            <input className="login__form__input" type="password" {...register("password")} />
          </div>

          <button className="login__form__btn">Login</button>
          <p className="login__form__footerText">
            Don't have an account? <span>Sign up</span>
          </p>
        </form>
      )}
    </main>
  );
};

export default Login;
