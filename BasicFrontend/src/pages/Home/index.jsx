import { useTranslation } from "react-i18next";
//import { useTranslation, withTranslation, Trans } from "react-i18next";

export default function signUp() {
  const { t } = useTranslation();
  return <> {t("mainPage")}</>;
}
