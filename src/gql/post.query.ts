import { gql } from "@apollo/client";

export const CREATE_POST = gql(`
  mutation CreatePost($ipfsHash: String!, $ownerId: ID!) {
    createPost(
      post: {
        ipfsHash: $ipfsHash
        chainId: "0x5"
        ownerId: $ownerId
      }
    ){
      _id
    }
  }
`);

export const GET_POSTS = gql(`
  query Posts {
    posts {
      _id
      ipfsHash
      ownerId
      likeId
      owner {
        _id
        walletAddress
        name
        avatar
        bio
      }
      like {
        _id
      }
      comment {
        _id
        message
        postId
        owner {
          _id
          walletAddress
          name
          avatar
        }
      }
    }
  }
`);
