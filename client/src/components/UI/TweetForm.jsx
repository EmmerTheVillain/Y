import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_TWEET } from '../../utils/mutations';
import { QUERY_TWEETS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const TweetForm = () => {
  const [tweetText, setTweetText] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addTweet, { error }] = useMutation(ADD_TWEET, {
    update(cache, { data: { addTweet } }) {
      try {
        const { tweets } = cache.readQuery({ query: QUERY_TWEETS });

        cache.writeQuery({
          query: QUERY_TWEETS,
          data: { tweets: [addTweet, ...tweets] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const meData = cache.readQuery({ query: QUERY_ME });
      if (meData && meData.me) {
        const { me } = meData;
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, thoughts: [...me.thoughts, addThought] } },
        });
      }
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addTweet({
        variables: {
          tweetText,
          tweetAuthor: Auth.getProfile().data.username,
        },
      });

      setTweetText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'tweetText' && value.length <= 280) {
      setTweetText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h3>y not?</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="tweetText"
                placeholder="Here's a new tweet..."
                value={tweetText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-dark btn-block py-3" type="submit">
                Add Tweet
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your tweets. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default TweetForm;
