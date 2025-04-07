import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../Sidebar/'
import './index.scss'

const Layout = () => {
  const location = useLocation();
  let hiddenTag = "";
  const isTagHidden = () => {
    switch (location.pathname) {
      case '/':
        hiddenTag = "hidden-tags"
        break;
      default:
        hiddenTag = "show-tags"
        break;
    }
  };
  isTagHidden();
  return (
    <div className="App">
      <Sidebar />
      <div className="page">
        <span className={`tags top-tags ${hiddenTag}`}>
          &lt;body&gt;
          </span>

        <Outlet />
        <span className={`tags bottom-tags ${hiddenTag}`}>
          &lt;/body&gt;
          <br />
          <span className={`bottom-tag-html ${hiddenTag}`}>
            &lt;/html&gt;
            </span>
        </span>
      </div>
    </div>
  )
}

export default Layout
