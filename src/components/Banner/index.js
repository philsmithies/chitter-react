import BannerImg from './banner.jpeg'
import './index.css'

export default function Banner(props){
  return(
    <div className="bannerimg">
    <img src={BannerImg} alt="banner" ></img>
    </div>
  )
}