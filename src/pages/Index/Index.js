import ExploreBar from '../../components/ExploreBar/ExploreBar.js'
import './styles.css'

export default function Index() {
  return(
    <div className="main_grid">
      <div class="main_content">
        <h1>Index Page</h1>
      </div>
      <div className="sidebar">
        <ExploreBar/>
      </div>
      <div className="signupbar">
        <ExploreBar/>
      </div>
    </div>
  )
}