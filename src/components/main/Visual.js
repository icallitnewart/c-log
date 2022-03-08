import Intro from "./Intro";
import Prompt from "./Prompt";
import PostList from "./PostList";


function Visual() {
    return(
        <main className="visual">
        <div className="wrap">
            <Intro />
            <Prompt />
            <PostList />
        </div>
        </main>
    )
}

export default Visual;