import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import {
  Nav,
  NavDropdown,
  Accordion,
  Card,
  Button,
  InputGroup,
  FormControl
} from 'react-bootstrap';

const mapStateToProps = state => ({
  tags: state.photos.tags,
  inputTag: state.photos.inputTag,
});

const mapDispatchToProps = dispatch => ({
  handleGetTags: (tags) => dispatch(actions.getTags(tags)),
  handleTagInput: (input) => dispatch(actions.inputTag(input)),
  handleAddTagType: (tagObj) => dispatch(actions.addTagType(tagObj)),
  handleAddTag: (tagObj) => dispatch(actions.addTag(tagObj))
});

const SideBar = (props) => {
  useEffect(() => {
    fetch('/tags')
      .then(res => res.json())
      .then(res => props.handleGetTags(res))
      .catch(err => console.log(err))
  }, []);

  const handleTagClick = () => {
    const tagName = props.inputTag.trim();
    fetch('http://localhost:3000/tags', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tag: tagName
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log('res', res) // {tagid: 3}
        props.handleAddTagType({
          tagid: res.tagid,
          tag: tagName,
          // userid: res.userid
        });
      })
      .catch(err => console.log('Error: ', err))
  };

  const tagList = props.tags.map((tag, index) => {
    return (
      <button
        key={`tag${index}`}
        className="button-tag"
      >{tag.tag}</button>
    )
  });

  return (
    <>
      <Accordion defaultActiveKey="0">
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Tags
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <div className="tag-list">
                {tagList}
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <Button varianßt="outline-secondary" onClick={handleTagClick}>+ Tag</Button>
          </InputGroup.Prepend>
          <FormControl aria-describedby="basic-addon1" onChange={e => props.handleTagInput(e.target.value)} />
        </InputGroup>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="1">
              Click me!
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>Hello! I'm another body</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);