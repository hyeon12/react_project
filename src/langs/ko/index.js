import commons from "./commons";
import validations from "./validations";
import errors from "./errors";

const ko = { ...commons, ...validations, ...errors }; //하나로 연동

export default ko;