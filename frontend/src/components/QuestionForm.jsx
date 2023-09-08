import { Form, Row, Col, FormGroup, Label, Input, Button } from 'reactstrap'
import * as FcIcons from 'react-icons/fc'

const QuestionForm = (props) => {
  return (
    <Form>
      <Row>
        <FormGroup>
          <Label for="question_text">
            Question <FcIcons.FcInfo />
          </Label>
          <Input
            id="question_text"
            name="question_text"
            type="text"
            onChange={(e) => props.handleChange(e)}
          />
        </FormGroup>
      </Row>
      <FormGroup>
        <Label for="long_question_text">
          Elaboration <FcIcons.FcInfo />
        </Label>
        <Input
          id="long_question_text"
          name="long_question_text"
          type="textarea"
          onChange={(e) => props.handleChange(e)}
        />
      </FormGroup>
    </Form>
  )
}
export default QuestionForm