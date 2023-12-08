import { gql } from "@apollo/client";

export const GET_USER_BY_OWNER_ID = gql(`
    query PostByOwnerId($ownerId: ID!) {
        postByOwnerId(ownerId: $ownerId) {
        ipfsHash
        owner {
            _id
            walletAddress
        }
        }
    }
`);

export const CREATE_USER =
  gql(`mutation CreateProfile($walletAddress: String!, $name: String!) {
    createProfile(profile: {walletAddress: $walletAddress, name: $name}) {
        _id
        walletAddress
        name
    }
}`);

export const GET_USER = gql(`query Profile($walletAddress: String!) {
    profile(walletAddress: $walletAddress) {
        _id
        walletAddress
        name
        avatar
        bio
        post {
            _id
            ipfsHash
            ownerId
            likeId
            comment {
                _id
                message
                postId
                ownerId
                likeId
                owner {
                    _id
                    walletAddress
                    name
                    avatar
                    bio
                }
            }
            like {
                _id
            }
        }
    }
}
`);
