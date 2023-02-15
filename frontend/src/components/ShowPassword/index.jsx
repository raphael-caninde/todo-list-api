import { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";

export function ShowPassword() {
  const [visible, setVisible] = useState(false);

  const icon =  visible ?
    <BiHide
      size={27}
      className='absolute right-4 top-5 cursor-pointer'
      onClick={() => setVisible(!visible)}
    /> :
    <BiShow
      size={27}
      className='absolute right-4 top-5 cursor-pointer'
      onClick={() => setVisible(!visible)}
    />

  const inputType = visible ? 'text' : 'password';

  return [icon, inputType];

}
