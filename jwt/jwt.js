import expressJWT from 'express-jwt';
import {SECRET_KEY} from '../tools/constant';

const JWTAuth = expressJWT({
  secret: SECRET_KEY,
}).unless(
  {
    path: [
      {url: '/api/login', methods: ['POST']},
      {url: '/api/abouts', methods: ['GET']},
      {url: '/api/latestAnnouncements', methods: ['GET']},
      {url: '/api/articlesByTitle', methods: ['GET']},
      {url: '/api/articlesByTag', methods: ['GET']},
      {url: '/api/articlesByPV', methods: ['GET']},
      {url: '/api/allTags', methods: ['GET']},
      {url: '/api/archives', methods: ['GET']},
      {url: /^\/api\/articleList\/page\/.*/, methods: ['GET']},
      {url: /^\/api\/articles\/.*/, methods: ['GET']},
      {url: /^\/api\/articlePV\/.*/, methods: ['PUT']},
      {url: /^\/api\/likes\/.*/, methods: ['GET']},
      {url: /^\/api\/likes\/.*/, methods: ['PUT']},
      {url: /^\/api\/covers\/.*/, methods: ['GET']},
      {url: '/api/latestFourFeaturedRecords', methods: ['GET']},
      {url: '/api/liveTours', methods: ['GET']},
      {url: '/api/latestMotto', methods: ['GET']},
      {url: '/api/litePlayers', methods: ['GET']},
      {url: '/api/userInfo', methods: ['GET']},
      {url: '/api/programExperience', methods: ['GET']},
      {url: '/api/workExperience', methods: ['GET']},
      {url: '/api/latestThreeProjects', methods: ['GET']},
      {url: '/api/yanceyMusic', methods: ['GET']},
      {url: '/api/globalStatus', methods: ['GET']},
    ]
  }
);

export default JWTAuth;
