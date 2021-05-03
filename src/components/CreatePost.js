import React, { useState } from 'react';
import Page from './Page';
import { createPost } from '../services/PostRepository';
import { withRouter } from 'react-router-dom';

function CreatePost(props) {

  const [title, setTitle] = useState();
  const [body, setBody] = useState();

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const response = await createPost({
        title,
        body,
        token: localStorage.getItem('complexapp-token')
      });
      props.addMessage("Congrats! You successfuly created a post.")
      props.history.push(`/post/${response.data}`)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Page title="Create Post">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="post-title" className="text-muted mb-1">
            <small>Title</small>
          </label>
          <input autoFocus name="title" id="post-title" className="form-control form-control-lg form-control-title"
            type="text" placeholder="" autoComplete="off" onChange={e => setTitle(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="post-body" className="text-muted mb-1 d-block">
            <small>Body Content</small>
          </label>
          <textarea name="body" id="post-body" className="body-content tall-textarea form-control"
            type="text" onChange={e => setBody(e.target.value)}></textarea>
        </div>

        <button className="btn btn-primary">Save New Post</button>
      </form>
    </Page>
  );
}

export default withRouter(CreatePost);