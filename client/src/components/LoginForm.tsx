import { useContext, useState } from "react";
import {} from "../index";
import { StoreContext } from "../store/StoreContext";
import remove_img from "../img/remove_red_eye.svg";
import remove_close_img from "../img/remove_eye-off-outline.svg";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { observer } from 'mobx-react-lite';


const LoginForm = () => {
  const initialValues = {
    email: "",
    password: "",
    role: "",
    keepLoggedIn: false,
  };

  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const { store } = useContext(StoreContext);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Nieprawidłowy adres email")
      .required("Email jest wymagany"),
    password: Yup.string()
      .min(8, "Password musi mieć co najmniej 8 znaków")
      .required("Password jest wymagane"),
    role: Yup.string().required("Wybierz swoje oddział"),
  });


  const onSubmit = async (values: any, { resetForm }: any) => {
    
    try {
      await store.login(values.email, values.password, values.role);
      
      if (keepLoggedIn) {
        localStorage.setItem("isLoggedIn", "true");
      }
      
      if (store.isAuth) {}
      navigate("/brand");
      resetForm();
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  };
  

  return (
    <section className="flex flex-col">
      <div className="text-left">
        <h3 className="font-bold text-4xl leading-10">Logowanie do oddziału</h3>
        <p className="text-base text-[#A3AED0] tracking-tight mt-2  pb-[13px] relative">
          Wpisz swój adres e-mail i hasło, aby się zalogować!
          <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#E0E5F2] max-[500px]:w-[310px]"></span>
        </p>
      </div>
      <div className="flex flex-col">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values, errors, touched }) => (
            <Form method="post">
              <div className="mt-8 mb-[51px]">
                <Field
                  as="select"
                  name="role"
                  className={`w-[388px] py-3 px-4 border border-[#E0E2E7] bg-transparent rounded-2xl text-[#A3AED0] focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm max-[500px]:w-[310px] ${
                    touched.role && errors.role ? "border-red-500" : ""
                  }`}
                >
                  <option value="0">Select your Branch...</option>
                  <option>Бренд</option>
                  <option>Афіліат</option>
                </Field>
                <ErrorMessage
                  name="role"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                  <label className="form_label" htmlFor="user-email">
                    Email*
                  </label>
                  <div>
                    <Field
                      className="form_input mb-6 w-[410px] max-[500px]:w-[310px]"
                      id="user-email"
                      type="text"
                      placeholder="mail@simmmple.com"
                      name="email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-[2px]"
                    />
                  </div>
                </div>
                <div>
                <label className="form_label" htmlFor="user-password">
                  Password*
                </label>
                <div className="relative">
                  <Field
                    className="form_input mb-[5px] w-[410px] max-[500px]:w-[310px]"
                    id="user-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 8 characters"
                    name="password"
                  />
                  <img
                    src={showPassword ? remove_img : remove_close_img}
                    alt={showPassword ? "Hide password" : "Show password"}
                    onClick={handleTogglePassword}
                    className="absolute inset-y-0 right-0 mt-[30px] mr-[18px] cursor-pointer"
                  />
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-[2px]"
                />
              </div>
              <div className="">
          <div className="text-[#2E65F3] text-[14px] leading-5 text-end font-medium max-[500px]:mr-[16px]">
            <Link to="/">Forget password?</Link>
          </div>
          <div className="flex  mt-[29px]  mb-[39px]">
            <label className="flex items-center mb-4 text-[14px] leading-5">
              <input
                type="checkbox"
                checked={keepLoggedIn}
                onChange={() => setKeepLoggedIn(!keepLoggedIn)}
                className="mr-2 w-[18px] h-[18px]"
              />
              Keep me logged in
            </label>
          </div>
          <button type="submit" className="button">
          Login
                </button>
        </div>
            </Form>
          )}
        </Formik>
      </div>
      <div className="text-[13px] tracking-tight leading-6 mt-[50px] text-[#A3AED0]">
        © 2022 Horizon UI. All Rights Reserved. Made with love by Simmmple!
      </div>
    </section>
  );
};

export default observer(LoginForm)