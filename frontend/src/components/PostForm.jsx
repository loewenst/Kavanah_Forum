// need imports
//post object needs:

//topic id
//user id
//tl;dr
//emotion
//opt: elaboration
//opt: sources
//opt: other emotions
//opt: related topics

//form: fields:
//topic (for now)
//emotion
//one liner
//elaboration
//
const PostForms = () => {
  // const initialState = {
  //   pk: 0,
  //   user: user
  // }

  return (
    <form>
      <label htmlFor="topic">Topic:</label>
      <input type="text" id="topic" />
      {/* <select id="issueType" onChange={handleChange} value={formState.issueType}>
    <option value="outage">Service Outage</option>
    <option value="billing">Billing</option>
    <option value="cancel">Cancel Service</option>
  </select> */}
      <label htmlFor="emotion">Associated Emotion:</label>
      <input type="text" id="base_emotion" />
      <label htmlFor="tldr">One-Sentence Version:</label>
      <input type="text" id="tldr" />
      <label htmlFor="elaboration">Elaboration:</label>
      <textarea id="elaboration" cols="30" rows="10"></textarea>
      <button type="submit">Send</button>
    </form>
  )
}
export default PostForms
