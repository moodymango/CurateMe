const artChicagoApiController = require("../../server/controllers/artChicagoApi");
const axios = require("axios");
//what kind of behavior might I want to prevent due to client error?
//should throw 400 error if there the search term field is an empty string
//throw a 400 error if the due to mispelling of the search term?
//should retrieve data by search term and send response correctly
//consider possible errors from the server:
//api limit errors, pagination errors, perhaps add throttling to API(reduce # of requests per second if the 3rd party api cannot handle it)
//tefor schema changes - what if API releases new version and updates response schema?
//tethe average response time or latency of the 3rd party api - want to ensure the response takes less than 3000ms?

//create a  mocked call api value representing a test call to the third party api

//example result of data after searching degas with a limit of 10 results;
// {
// preference: null,
//        pagination: {
//          total: 111,
//          limit: 10,
//          offset: 0,
//          total_pages: 12,
//          current_page: 1
//        },
//        data: [
//          {
//            _score: 78.21333,
//            is_public_domain: true,
//            medium_display: 'Pastel over monotype on cream laid paper',
//            inscriptions: 'Signed recto, lower left, in white pastel: "Degas"',
//            artist_display: 'Edgar Degas\nFrench, 1834-1917',
//            date_display: '1877',
//            artist_title: 'Hilaire Germain Edgar Degas',
//            id: 61603,
//            image_id: 'cb34b0a8-bc51-d063-aab1-47c7debf3a7b',
//            title: 'Ballet at the Paris Opéra',
//            classification_title: 'pastel',
//            place_of_origin: 'France',
//            dimensions: 'Plate: 35.2 × 70.6 cm (13 7/8 × 27 13/16 in.); Sheet: 35.9 × 71.9 cm (14 3/16 × 28 5/16 in.)'
//          },
//          {
//            _score: 76.6345,
//            is_public_domain: true,
//            medium_display: 'Oil on canvas',
//            inscriptions: null,
//            artist_display: 'Edgar Degas\nFrench, 1834-1917',
//            date_display: 'c. 1879-86',
//            artist_title: 'Hilaire Germain Edgar Degas',
//            id: 14572,
//            image_id: '6f513908-03cc-b974-633b-adfce56b7936',
//            title: 'The Millinery Shop',
//            classification_title: 'painting',
//            place_of_origin: 'France',
//            dimensions: '100 × 110.7 cm (39 3/8 × 43 9/16 in.)'
//          },
//          {
//            _score: 69.17728,
//            is_public_domain: true,
//            medium_display: 'Oil on canvas',
//            inscriptions: null,
//            artist_display: 'Edgar Degas\nFrench, 1834-1917',
//            date_display: '1875/76',
//            artist_title: 'Hilaire Germain Edgar Degas',
//            id: 14574,
//            image_id: 'ba4d7ead-bd10-e02d-6f5f-613050d7062e',
//            title: "Henri Degas and His Niece Lucie Degas (The Artist's Uncle and Cousin)",
//            classification_title: 'painting',
//            place_of_origin: 'France',
//            dimensions: '99.8 × 119.9 cm (39 1/4 × 47 3/16 in.)'
//          },
//          {
//            _score: 41.34611,
//            is_public_domain: true,
//            medium_display: 'Graphite with stumping on tan wove paper',
//            inscriptions: null,
//            artist_display: 'Edgar Degas\nFrench, 1834-1917',
//            date_display: '1866–68',
//            artist_title: 'Hilaire Germain Edgar Degas',
//            id: 7157,
//            image_id: 'ad17b244-a719-40fc-69c9-06fd54362ea8',
//            title: 'Jockey',
//            classification_title: 'graphite',
//            place_of_origin: 'France',
//            dimensions: '32.7 × 24.7 cm (12 7/8 × 9 3/4 in.)'
//          },
//          {
//            _score: 40.213512,
//            is_public_domain: true,
//            medium_display: 'Oil on canvas',
//            inscriptions: 'Inscribed lower right: Degas',
//            artist_display: 'Edgar Degas\nFrench, 1834–1917',
//            date_display: 'c. 1860',
//            artist_title: 'Hilaire Germain Edgar Degas',
//            id: 13487,
//            image_id: 'ca2932b4-6c0c-5482-2ae5-8b74926d7b73',
//            title: 'Young Spartan Girls Challenging Boys',
//            classification_title: 'painting',
//            place_of_origin: 'France',
//            dimensions: '97.4 × 140 cm (38 5/16 × 55 1/8 in.)'
//          },
//          {
//            _score: 39.574078,
//            is_public_domain: true,
//            medium_display: 'Oil on canvas',
//            inscriptions: 'Inscribed at lower right: Degas',
//            artist_display: 'Edgar Degas\nFrench, 1834-1917',
//            date_display: '1874/76',
//            artist_title: 'Hilaire Germain Edgar Degas',
//            id: 18951,
//            image_id: '8fe022ba-e358-5cda-aa70-d96edd0b4f20',
//            title: 'Yellow Dancers (In the Wings)',
//            classification_title: 'painting',
//            place_of_origin: 'France',
//            dimensions: '73.5 × 59.5 cm (28 15/16 × 23 7/16 in.)'
//          },
//          {
//            _score: 38.738605,
//            is_public_domain: true,
//            medium_display: 'Pastel on cream wove paper, edge mounted on board',
//            inscriptions: 'Signed recto, lower right, in brown patel: "Degas"',
//            artist_display: 'Edgar Degas\nFrench, 1834-1917',
//            date_display: '1879/81',
//            artist_title: 'Hilaire Germain Edgar Degas',
//            id: 60656,
//            image_id: '0850f3ab-a29d-acc7-0d3b-0551ceeea5ed',
//            title: 'The Star',
//            classification_title: 'pastel',
//            place_of_origin: 'France',
//            dimensions: '73.3 × 57.4 cm (28 7/8 × 22 5/8 in.)'
//          },
//          {
//            _score: 36.9783,
//            is_public_domain: true,
//            medium_display: 'Etching in black on ivory laid paper',
//            inscriptions: 'Inscribed recto, lower left, in graphite: "Degas par lui- (?)- 23 ans 1857"; inscribed verso, lower right, in graphite: "26812"',
//            artist_display: 'Edgar Degas\nFrench, 1834-1917',
//            date_display: '1857',
//            artist_title: 'Hilaire Germain Edgar Degas',
//            id: 13551,
//            image_id: 'd5c86d65-97e1-478b-8ecf-cc668355d923',
//            title: 'Self-Portrait',
//            classification_title: 'etching',
//            place_of_origin: 'France',
//            dimensions: 'Image/plate: 23.2 × 14.3 cm (9 3/16 × 5 11/16 in.); Sheet: 32.4 × 23.3 cm (12 13/16 × 9 3/16 in.)'
//          },
//          {
//            _score: 36.63628,
//            is_public_domain: true,
//            medium_display: 'Oil on canvas',
//            inscriptions: 'Inscribed lower left: Degas',
//            artist_display: 'Edgar Degas\nFrench, 1834–1917',
//            date_display: '1879',
//            artist_title: 'Hilaire Germain Edgar Degas',
//            id: 84076,
//            image_id: 'a867af78-9a29-c75b-33ab-2f21a2d92b3f',
//            title: 'Café Singer',
//            classification_title: 'painting',
//            place_of_origin: 'France',
//            dimensions: '53.5 × 41.8 cm (21 1/16 × 16 7/16 in.)'
//          },
//          {
//            _score: 36.513012,
//            is_public_domain: true,
//            medium_display: 'Pastel and essence over monotype on cream laid paper, laid down on board',
//            inscriptions: null,
//            artist_display: 'Edgar Degas\nFrench, 1834-1917',
//            date_display: '1876–77',
//            artist_title: 'Hilaire Germain Edgar Degas',
//            id: 81531,
//            image_id: '7ea8e269-0fef-35d3-2299-9ec7cae0f757',
//            title: 'On the Stage',
//            classification_title: 'pastel',
//            place_of_origin: 'France',
//            dimensions: '59.2 × 42.8 cm (23 5/16 × 16 7/8 in.)'
//          }
//        ],
//        info: {
//          license_text: 'The `description` field in this response is licensed under a Creative Commons Attribution 4.0 Generic License (CC-By) and the Terms and Conditions of artic.edu. All other data in this response is licensed under a Creative Commons Zero (CC0) 1.0 designation and the Terms and Conditions of artic.edu.',
//          license_links: [
//            'https://creativecommons.org/publicdomain/zero/1.0/',
//            'https://www.artic.edu/terms'
//          ],
//          version: '1.10'
//        },
//        config: {
//          iiif_url: 'https://www.artic.edu/iiif/2',
//          website_url: 'http://www.artic.edu'
//        }
// }

jest.mock("axios");

test("Should fetch requested information by artist_title", async () => {
  axios.get.mockResolvedValue({
    data: [
      {
        _score: 78.21333,
        is_public_domain: true,
        medium_display: "Pastel over monotype on cream laid paper",
        inscriptions: 'Signed recto, lower left, in white pastel: "Degas"',
        artist_display: "Edgar Degas\nFrench, 1834-1917",
        date_display: "1877",
        artist_title: "Hilaire Germain Edgar Degas",
        id: 61603,
        image_id: "cb34b0a8-bc51-d063-aab1-47c7debf3a7b",
        title: "Ballet at the Paris Opéra",
        classification_title: "pastel",
        place_of_origin: "France",
        dimensions:
          "Plate: 35.2 × 70.6 cm (13 7/8 × 27 13/16 in.); Sheet: 35.9 × 71.9 cm (14 3/16 × 28 5/16 in.)",
      },
      {
        _score: 76.6345,
        is_public_domain: true,
        medium_display: "Oil on canvas",
        inscriptions: null,
        artist_display: "Edgar Degas\nFrench, 1834-1917",
        date_display: "c. 1879-86",
        artist_title: "Hilaire Germain Edgar Degas",
        id: 14572,
        image_id: "6f513908-03cc-b974-633b-adfce56b7936",
        title: "The Millinery Shop",
        classification_title: "painting",
        place_of_origin: "France",
        dimensions: "100 × 110.7 cm (39 3/8 × 43 9/16 in.)",
      },
      {
        _score: 69.17728,
        is_public_domain: true,
        medium_display: "Oil on canvas",
        inscriptions: null,
        artist_display: "Edgar Degas\nFrench, 1834-1917",
        date_display: "1875/76",
        artist_title: "Hilaire Germain Edgar Degas",
        id: 14574,
        image_id: "ba4d7ead-bd10-e02d-6f5f-613050d7062e",
        title:
          "Henri Degas and His Niece Lucie Degas (The Artist's Uncle and Cousin)",
        classification_title: "painting",
        place_of_origin: "France",
        dimensions: "99.8 × 119.9 cm (39 1/4 × 47 3/16 in.)",
      },
      {
        _score: 41.34611,
        is_public_domain: true,
        medium_display: "Graphite with stumping on tan wove paper",
        inscriptions: null,
        artist_display: "Edgar Degas\nFrench, 1834-1917",
        date_display: "1866–68",
        artist_title: "Hilaire Germain Edgar Degas",
        id: 7157,
        image_id: "ad17b244-a719-40fc-69c9-06fd54362ea8",
        title: "Jockey",
        classification_title: "graphite",
        place_of_origin: "France",
        dimensions: "32.7 × 24.7 cm (12 7/8 × 9 3/4 in.)",
      },
      {
        _score: 40.213512,
        is_public_domain: true,
        medium_display: "Oil on canvas",
        inscriptions: "Inscribed lower right: Degas",
        artist_display: "Edgar Degas\nFrench, 1834–1917",
        date_display: "c. 1860",
        artist_title: "Hilaire Germain Edgar Degas",
        id: 13487,
        image_id: "ca2932b4-6c0c-5482-2ae5-8b74926d7b73",
        title: "Young Spartan Girls Challenging Boys",
        classification_title: "painting",
        place_of_origin: "France",
        dimensions: "97.4 × 140 cm (38 5/16 × 55 1/8 in.)",
      },
      {
        _score: 39.574078,
        is_public_domain: true,
        medium_display: "Oil on canvas",
        inscriptions: "Inscribed at lower right: Degas",
        artist_display: "Edgar Degas\nFrench, 1834-1917",
        date_display: "1874/76",
        artist_title: "Hilaire Germain Edgar Degas",
        id: 18951,
        image_id: "8fe022ba-e358-5cda-aa70-d96edd0b4f20",
        title: "Yellow Dancers (In the Wings)",
        classification_title: "painting",
        place_of_origin: "France",
        dimensions: "73.5 × 59.5 cm (28 15/16 × 23 7/16 in.)",
      },
      {
        _score: 38.738605,
        is_public_domain: true,
        medium_display: "Pastel on cream wove paper, edge mounted on board",
        inscriptions: 'Signed recto, lower right, in brown patel: "Degas"',
        artist_display: "Edgar Degas\nFrench, 1834-1917",
        date_display: "1879/81",
        artist_title: "Hilaire Germain Edgar Degas",
        id: 60656,
        image_id: "0850f3ab-a29d-acc7-0d3b-0551ceeea5ed",
        title: "The Star",
        classification_title: "pastel",
        place_of_origin: "France",
        dimensions: "73.3 × 57.4 cm (28 7/8 × 22 5/8 in.)",
      },
      {
        _score: 36.9783,
        is_public_domain: true,
        medium_display: "Etching in black on ivory laid paper",
        inscriptions:
          'Inscribed recto, lower left, in graphite: "Degas par lui- (?)- 23 ans 1857"; inscribed verso, lower right, in graphite: "26812"',
        artist_display: "Edgar Degas\nFrench, 1834-1917",
        date_display: "1857",
        artist_title: "Hilaire Germain Edgar Degas",
        id: 13551,
        image_id: "d5c86d65-97e1-478b-8ecf-cc668355d923",
        title: "Self-Portrait",
        classification_title: "etching",
        place_of_origin: "France",
        dimensions:
          "Image/plate: 23.2 × 14.3 cm (9 3/16 × 5 11/16 in.); Sheet: 32.4 × 23.3 cm (12 13/16 × 9 3/16 in.)",
      },
      {
        _score: 36.63628,
        is_public_domain: true,
        medium_display: "Oil on canvas",
        inscriptions: "Inscribed lower left: Degas",
        artist_display: "Edgar Degas\nFrench, 1834–1917",
        date_display: "1879",
        artist_title: "Hilaire Germain Edgar Degas",
        id: 84076,
        image_id: "a867af78-9a29-c75b-33ab-2f21a2d92b3f",
        title: "Café Singer",
        classification_title: "painting",
        place_of_origin: "France",
        dimensions: "53.5 × 41.8 cm (21 1/16 × 16 7/16 in.)",
      },
      {
        _score: 36.513012,
        is_public_domain: true,
        medium_display:
          "Pastel and essence over monotype on cream laid paper, laid down on board",
        inscriptions: null,
        artist_display: "Edgar Degas\nFrench, 1834-1917",
        date_display: "1876–77",
        artist_title: "Hilaire Germain Edgar Degas",
        id: 81531,
        image_id: "7ea8e269-0fef-35d3-2299-9ec7cae0f757",
        title: "On the Stage",
        classification_title: "pastel",
        place_of_origin: "France",
        dimensions: "59.2 × 42.8 cm (23 5/16 × 16 7/8 in.)",
      },
    ],
  });
});

test("Should fetch requested information by artwork title");
