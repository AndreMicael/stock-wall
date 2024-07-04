import { AiOutlineLoading3Quarters } from "react-icons/ai";
import './Loading.css';
const Loading = () => {
  return (
    <div className="
    w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50'>
    flex justify-center items-center gap-2">
        <div className="
        loading-icon

        "><AiOutlineLoading3Quarters /></div>
        <h3>Carregando valores...</h3>
    </div>

  )
}

export default Loading