import { useContext, useState } from "react";
import {} from "../index";
import { StoreContext } from "../store/StoreContext";
import {} from "../index";
import { observer } from "mobx-react-lite";
import remove_img from "../img/remove_red_eye.svg";
import remove_close_img from "../img/remove_eye-off-outline.svg";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage} from "formik";

export const SignUpForm = observer(() => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    keepLoggedIn: false,
  };

  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate();


  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Nazwa jest wymagana"),
    email: Yup.string()
      .email("Nieprawidłowy adres email")
      .required("Email jest wymagany"),
    password: Yup.string()
      .min(8, "Hasło musi mieć co najmniej 8 znaków")
      .required("Hasło jest wymagane"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Hasła muszą być zgodne")
      .required("Potwierdzenie hasła jest wymagane"),
    role: Yup.string().required("Wybierz swoje oddział"),
  });

  const onSubmit = (values: any, { resetForm }: any) => {
    store.registration(values.name, values.email, values.password, values.role);
    if (keepLoggedIn) {
      localStorage.setItem("isLoggedIn", "true");
    }
    store.isAuth = true;

    navigate("/brand");
    resetForm();
  };

  const { store } = useContext(StoreContext);
  return (
    <section className="flex flex-col">
      <div className="text-left">
        <h3 className="font-bold text-4xl leading-10 pb-[13px] relative text-center">
          Rejestracja
          <span className="absolute bottom-0 left-0 w-[382px] h-[1px] bg-[#E0E5F2] max-[500px]:w-[310px]"></span>
        </h3>
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
              <div className="flex flex-row gap-[28px] max-[500px]:flex-col">
                <div>
                  <label className="form_label" htmlFor="user-email">
                    Nazwa
                  </label>
                  <div>
                    <Field
                      className="form_input mb-6 w-[177px] max-[500px]:w-[310px]"
                      id="user-name"
                      type="text"
                      placeholder="Nazwa"
                      name="name"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-sm mt-[2px]"
                    />
                  </div>
                </div>

                <div>
                  <label className="form_label" htmlFor="user-email">
                    Email*
                  </label>
                  <div>
                    <Field
                      className="form_input mb-6 w-[177px] max-[500px]:w-[310px]"
                      id="user-email"
                      type="text"
                      placeholder="E-mail"
                      name="email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-[2px]"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="form_label" htmlFor="user-password">
                  Hasło
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
                    className="absolute inset-y-0 right-0 mt-[30px] mr-[18px] cursor-pointer  max-[500px]:mr-[24px]"
                  />
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-[2px]"
                />
              </div>
              <div className="">
                <label className="form_label" htmlFor="user-password">
                  Potwierdź hasło
                </label>
                <div className="relative">
                  <Field
                    className="form_input mb-[5px] w-[410px] max-[500px]:w-[310px]"
                    id="user-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 8 characters"
                    name="confirmPassword"
                  />
                  <img
                    src={showPassword ? remove_img : remove_close_img}
                    alt={showPassword ? "Hide password" : "Show password"}
                    onClick={handleTogglePassword}
                    className="absolute inset-y-0 right-0 mt-[30px] mr-[18px] cursor-pointer max-[500px]:mr-[24px]"
                  />
                </div>
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm mt-[2px]"
                />
                <div className="text-[#2E65F3] text-[14px] leading-5 text-end font-medium max-[500px]:mr-[16px] max-[500px]:mr-[24px]">
                  <Link to="/">Forget password?</Link>
                </div>
                <div className="flex mt-[29px] mb-[39px]">
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
              </div>
              <div>
                <button type="submit" className="button">
                  Registration
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
});
