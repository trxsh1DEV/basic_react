import './styles.css';

import { Component } from 'react';

import { loadPosts } from '../../utils/load-posts';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 3,
    searchValue: ''
  };

  async componentDidMount() {
    await this.loadPosts()
  }

  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state;

    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage })
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos
    })
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value })
    
  }

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length

    const filteredPosts = !!searchValue
    ? allPosts.filter(post => post.title.toLowerCase().includes(searchValue.toLowerCase()))
    : posts
    

    return (
      <section className='container'>
        <div className='search-container'>
          {!!searchValue && (
            <h1>Search value: {searchValue} <br /></h1>
          )}

          <TextInput handleChange={this.handleChange} searchValue={searchValue}/>
        </div>

        {filteredPosts.length > 0
          ? <Posts posts={filteredPosts} />
          : <p>Não existem posts =/</p>
        }
        
        <div className='button-container'>
          {! searchValue && (
            <Button
            text={"Load More Posts"}
            click={this.loadMorePosts}
            disabled={noMorePosts}
            />
          )}
        </div>
      </section>
    )
  }
}

export default Home;
