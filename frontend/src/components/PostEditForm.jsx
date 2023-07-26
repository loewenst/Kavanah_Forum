import axios from 'axios'
import { useState } from 'react'
import { Form, Row, Col, FormGroup, Label, Input, Button } from 'reactstrap'
import Emotions from './Emotions'
import * as FcIcons from 'react-icons/fc'

const PostEditForm = (props) => {
  const [secondEmotionList, setSecondEmotionList] = useState([])
  const [thirdEmotionList, setThirdEmotionList] = useState([])

  const getSecondEmotionList = (firstEmotion) => {
    let workingArray = Emotions.filter((emotion) => emotion !== firstEmotion)
    console.log(workingArray)
    setSecondEmotionList(workingArray)
  }

  const getThirdEmotionList = (secondEmotion) => {
    let workingArray = secondEmotionList.filter(
      (emotion) => emotion !== secondEmotion
    )
    console.log(workingArray)
    setThirdEmotionList(workingArray)
  }

  return (
    <Form>
      <Row>
        <FormGroup>
          <Label for="tldr">
            One-Liner <FcIcons.FcInfo />
          </Label>
          <Input
            id="tldr"
            name="tldr"
            value={props.initialFormData.tldr}
            placeholder="When I say this, I feel/think..."
            type="text"
            onChange={(e) => props.handleChange(e)}
          />
        </FormGroup>
      </Row>
      <Row>
        <Col sm={4}>
          <FormGroup>
            <Label for="main_emotion">Primary Emotion</Label>
            <Input
              id="main_emotion"
              name="main_emotion"
              type="select"
              value={props.initialFormData.main_emotion}
              onChange={(e) => {
                getSecondEmotionList(e.target.value)
                props.handleChange(e)
              }}
            >
              {Emotions.map((emotion) => (
                <option key={emotion}>{emotion}</option>
              ))}
            </Input>
          </FormGroup>
        </Col>
        <Col sm={4}>
          <FormGroup>
            <Label for="second_emotion">Other Emotion</Label>
            <Input
              id="second_emotion"
              name="second_emotion"
              type="select"
              onChange={(e) => {
                getThirdEmotionList(e.target.value)
                props.handleChange(e)
              }}
            >
              {secondEmotionList &&
                secondEmotionList.map((emotion) => (
                  <option key={`${emotion}2`}>{emotion}</option>
                ))}
            </Input>
          </FormGroup>
        </Col>
        <Col sm={4}>
          <FormGroup>
            <Label for="third_emotion">Other Emotion</Label>
            <Input
              id="third_emotion"
              name="third_emotion"
              type="select"
              onChange={(e) => props.handleChange(e)}
            >
              {thirdEmotionList &&
                thirdEmotionList.map((emotion) => (
                  <option key={`${emotion}3`}>{emotion}</option>
                ))}
            </Input>
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        <Label for="elaboration">
          Elaboration <FcIcons.FcInfo />
        </Label>
        <Input
          id="elaboration"
          name="elaboration"
          type="textarea"
          value={props.initialFormData.elaboration}
          onChange={(e) => props.handleChange(e)}
        />
      </FormGroup>
      <Row>
        <Col sm={6}>
          <FormGroup>
            <Label for="sources">Sources</Label>
            <Input
              id="sources"
              type="text"
              value={props.initialFormData.sources}
              onChange={(e) => props.handleChange(e)}
            ></Input>
          </FormGroup>
        </Col>
        <Col sm={6}>
          <FormGroup>
            <Label for="related">Related</Label>
            <Input
              disabled
              id="related"
              type="text"
              placeholder="Coming Soon"
            ></Input>
          </FormGroup>
        </Col>
      </Row>
    </Form>
  )
}
export default PostEditForm
