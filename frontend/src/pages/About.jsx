import {
  UncontrolledAccordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem
} from 'reactstrap'
import { useState } from 'react'
import * as AiIcons from 'react-icons/ai'

const About = () => {
  return (
    <div style={{ marginLeft: '10px', marginRight: '10px' }}>
      <br />
      <h2>ABOUT KAVANAH</h2>
      <br />
      <UncontrolledAccordion>
        <AccordionItem>
          <AccordionHeader targetId="1">What Is Kavanah?</AccordionHeader>
          <AccordionBody accordionId="1">
            <p>
              Kavanah is a forum-style app intended to help mitigate one of the
              tougher issues in tefillah, Jewish prayer: it can be difficult to
              connect with prayers, to have them be a more meaningful experience
              than uttering words and checking off a box, with the occasional
              uplifting melody brightening it up here and there. Whether the
              issue is the language barrier, the way that tefillot become
              routine, or the fact that the actual meanings of tefillot just
              don't resonate in an obvious way (looking at you, Tachanun),
              having tefillah be a means of expressing something real and deep
              is just hard to do. And for anyone interested in trying to bridge
              that gap and really have tefillah be some kind of genuine,
              expressive experience, it can seem like an insurmountable task.
              Where do I even start? What do I actually do if something doesn't
              resonate? Are there different perspectives, and how can I find
              them?
              <br />
              <br />
              Here's the thing: at some point, someone somewhere probably
              stopped and had a helpful thought about a tefillah. Maybe it's the
              person who survived a dangerous blood clot, and brings that into
              Asher Yatzar. Or the person who read a Radak that suddenly throws
              Lechu Neranena into a whole new light. Or the person who went to a
              shi'ur or read a book and learned that a certain Gadol would think
              about X or Y during tefillah Z. Or the person who just stopped and
              thought for a minute, "who would I have to be, what would my heart
              and mind have to look like, for it to make sense for me to
              organically say these words, " and then worked on himself and
              became that person. Anyone who's already done the work of figuring
              out how to connect with tefillah holds knowledge that's incredibly
              useful to us - we just have no way to get it.
              <br />
              <br />
              That's what Kavanah is for: a centralized place for requesting or
              depositing kavanot, so that if you've done the work and have
              kananot that work for you, you can share them with the world and
              help the rest of us get there, and if you're struggling to connect
              with a tefillah, you can ask for help and see what the community
              can do to help. Kavanah lets users post kavanot, comment on them,
              ask questions, reply to them, and of course browse through what
              others have said. Hopefully, our collective insight and experience
              can help all of our tefillot become more meaningful and more real.
            </p>
          </AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="2">How to Use Kavanah</AccordionHeader>
          <AccordionBody accordionId="2">
            <p>
              Mostly, using Kavanah is straightforward - browse to the tefillah
              that interests you, and either read what's there, pose a question,
              offer a kavanah, or leave a reply. However, one possibly
              unexpected feature of the site is the way posting a kavanah works.
              The form for posting a kavanah has a few fields, including a short
              version, an optional elaboration, a place to cite any sources, and
              a (currently inactive) field for linking to related tefillot.
              There are also fields for indicating up to three emotions
              associated with the tefillah, and at least one emotion is required
              for posting; this is a deliberate choice, reflecting a belief that
              (a) a kavanah needs to have an emotional component by definition,
              and (b) it can be easier for users to try on and possibly
              incorporate kavanot into their own tefillah when they get a
              holistic picture of what the kavanah is, including the associated
              emotions.
            </p>
          </AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="3">
            The Backstory of Kavanah
          </AccordionHeader>
          <AccordionBody accordionId="3">
            <p>
              One of the primary motivations I had in creating Kavanah was to
              create a space where talking about the emotional and spiritual
              experience of tefillah, especially the aspects that touch upon our
              relationship with Hashem, with our fellow Jews, with the world and
              with ourselves - where all of that could be normal. For years,
              I've thought about the fact that if I was studying the same text
              as a friend of mine, it would be totally fair game for me to ask
              him a question about it, or share an insight; but if I wanted to
              ask a question about how he connects to Ashrei, or share my
              perspective on Aleinu, that would be weird. I think that's a
              shame. There are so many ways I might have helped others, and more
              likely they might have helped me, if these kinds of conversations
              happened more often. I hope that Kavanah can help make that
              possible.
              <br />
              <br />
              Kavanah would also never have existed if I hadn't had the good
              fortune to come across the sefer Yesod veShoresh haAvodah when I
              was in yeshiva. In case you're not familiar with it: it
              essentially follows the same order as Orach Chaim, starting with
              the day, moving to the week and then the month and the year, but
              instead of discussing laws, it discussed kavanot - what we ought
              to be thinking and feeling as we hear the Torah reading, or when
              we come across the wonders of nature, or when we're saying Az
              Yashir or Ya'aleh veYavo. I'd never encountered anything like it
              before, and it opened up new ways of experiencing Judaism for me,
              pushing me to try to find the meaning and invest emotionally in
              all aspects of Halacha. "Great," you might be thinking, "so why
              have this app, when we can all just go studyYesod veShoresh
              haAvodah?" I definitely don't think it's a bad idea for more
              people to encounter this sefer! But you can't ask a sefer
              questions, you can't get new insights or a variety of perspectives
              from a sefer, and it might not be so easy to connect with the
              insights of a sefer that's a few hundred years old, written for a
              different community in a different era; kavanah aims to address
              each of those points. So in a lot of ways, I don't really see
              Kavanah as doing something different, as much as I see it building
              on this, ahem, foundation.
            </p>
          </AccordionBody>
        </AccordionItem>
      </UncontrolledAccordion>

      <br />
      <br />
      <br />
      <br />
      <p style={{ fontSize: '.75em' }}>
        Kavanah was created by{' '}
        <a href="https://www.linkedin.com/in/daniel-z-loewenstein/">
          Daniel Loewenstein
        </a>
        .
      </p>
    </div>
  )
}

export default About
