import React, { useState, useEffect } from 'react';
import TweetList from '../TweetList';
import { useQuery } from '@apollo/client';
import { QUERY_TWEETS } from '../../utils/queries';

const GetTweets = ({ currentUser }) => {
  const { loading, data } = useQuery(QUERY_TWEETS);
  const tweets = data?.tweets || [];

  return (
    <div className="tweetList">
          <div className="col-12 col-md-8 mb-3">
            {loading ? (
              <div>Loading...</div>
            ) : (
              <TweetList tweets={tweets} title="YEETS" currentUser={currentUser} />
            )}
          </div>
    </div>
  );
};

export default GetTweets;
