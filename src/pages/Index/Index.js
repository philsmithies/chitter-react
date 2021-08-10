import ExploreBar from '../../components/ExploreBar'
import SignUpBar from '../../components/SignUpBar'
import Feed from '../../components/Feed'
import Footer from '../../components/Footer'
import './styles.css'

export default function Index() {
  return(
    <div className="main_grid">
      <div class="main_content">
        <Feed />
      </div>
      <div className="sidebar">
        <ExploreBar/>
      </div>
      <div className="signupbar">
        <SignUpBar />
      </div>
    </div>
  )
}