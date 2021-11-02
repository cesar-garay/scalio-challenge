import { SearchUserItem, SearchUsersResponse } from "./app/services/search.interfaces";

const ENGLISH_LANGUAGE = 'en';
const ENGLISH_TRANSLATIONS = {
  pleasantries: {
    greeting: 'Hello',
    appreciation: 'Thank You!'
  },
  PAGINATOR: {
    FIRST_PAGE: 'first page',
    RANGE: "Page {{first}} of {{last}}"
  }
};

const SPANISH_LANGUAGE = 'es';
const SPANISH_TRANSLATIONS = {
  pleasantries: {
    greeting: 'Hola',
    appreciation: 'Gracias'
  },
  PAGINATOR: {
    FIRST_PAGE: 'primera pagina',
    RANGE: "Pagina {{first}} de {{last}}"
  }
};

export const TRANSLATIONS = {
  [ENGLISH_LANGUAGE]: ENGLISH_TRANSLATIONS,
  [SPANISH_LANGUAGE]: SPANISH_TRANSLATIONS
};

export const testUser1: SearchUserItem = {
  "login": "test",
  "id": 383316,
  "node_id": "MDQ6VXNlcjM4MzMxNg==",
  "avatar_url": "https://avatars.githubusercontent.com/u/383316?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/test",
  "html_url": "https://github.com/test",
  "followers_url": "https://api.github.com/users/test/followers",
  "following_url": "https://api.github.com/users/test/following{/other_user}",
  "gists_url": "https://api.github.com/users/test/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/test/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/test/subscriptions",
  "organizations_url": "https://api.github.com/users/test/orgs",
  "repos_url": "https://api.github.com/users/test/repos",
  "events_url": "https://api.github.com/users/test/events{/privacy}",
  "received_events_url": "https://api.github.com/users/test/received_events",
  "type": "User",
  "site_admin": false,
  "score": 1.0
};

export const testUser2: SearchUserItem = {
  "login": "Testing42",
  "id": 43222504,
  "node_id": "MDQ6VXNlcjQzMjIyNTA0",
  "avatar_url": "https://avatars.githubusercontent.com/u/43222504?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/Testing42",
  "html_url": "https://github.com/Testing42",
  "followers_url": "https://api.github.com/users/Testing42/followers",
  "following_url": "https://api.github.com/users/Testing42/following{/other_user}",
  "gists_url": "https://api.github.com/users/Testing42/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/Testing42/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/Testing42/subscriptions",
  "organizations_url": "https://api.github.com/users/Testing42/orgs",
  "repos_url": "https://api.github.com/users/Testing42/repos",
  "events_url": "https://api.github.com/users/Testing42/events{/privacy}",
  "received_events_url": "https://api.github.com/users/Testing42/received_events",
  "type": "User",
  "site_admin": false,
  "score": 1.0
}

export const testRequestResponse: SearchUsersResponse = {
  total_count: 2,
  incomplete_results: false,
  items: [testUser1, testUser2],
  currentPage: 1
}
