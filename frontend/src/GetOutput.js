import Axios from "axios";

Axios.defaults.withCredentials = true;

const getOutput = async (code, lang, input, question_id, btn_clicked) => {
  let url = `${process.env.REACT_APP_SERVER_ADDRESS}/`;
  // url = url + (question_id === undefined) ? "run" : `submit/ + question_id`;
  if (
    (question_id === undefined && btn_clicked === "run") ||
    btn_clicked === "run"
  ) {
    url += "run";
  } else {
    url += `submit/${question_id}`;
  }
  try {
    const res = await Axios({
      url: url,
      method: "post",
      data: {
        code: code,
        lang: lang,
        input: input,
        question_id: question_id,
      },
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export default getOutput;
