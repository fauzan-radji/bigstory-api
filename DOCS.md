# Documentation

## Base URL

```
https://bigstory-api.vercel.app/v1/
```

## Endpoints

<details>
  <summary><h3>Stories</h3></summary>

<!-- Start | Get all stories -->

- <details>
    <summary><h4>Get all stories</h4></summary>

  Returns all stories without pagination. You can also search for stories by providing a query parameter.

  ```http
  GET /stories
  ```

  ##### Parameters

  |  Name   |   Type   | Description      | Required | Default |
  | :-----: | :------: | ---------------- | :------: | :-----: |
  | `query` | `string` | The search query |   :x:    |    -    |

  ##### Success Response

  ```json
  {
    "message": "Stories fetched successfully",
    "data": [
      {
        "id": 1,
        "title": "The Big Story",
        "writer": "John Doe",
        "synopsis": "A story about a big story",
        "category": "Technology",
        "status": 1,
        "cover": "https://bigstory-api.vercel.app/v1/images/cover.jpg",
        "keywords": [
          { "id": 1, "text": "school" },
          { "id": 2, "text": "fiction" }
        ]
      },
      {
        "id": 2,
        "title": "Another Big Story",
        "writer": "John Doe",
        "synopsis": "The Big Stories continues",
        "category": "Technology",
        "status": 0,
        "cover": "https://bigstory-api.vercel.app/v1/images/cover.jpg",
        "keywords": []
      }
    ]
  }
  ```

  </details>

<!-- End | Get all stories -->

<!-- Start | Get a story -->

- <details>
    <summary><h4>Get a story</h4></summary>

  Returns a story by its ID.

  ```http
  GET /stories/:id
  ```

  ##### Parameters

  | Name |   Type   | Description  |      Required      | Default |
  | :--: | :------: | ------------ | :----------------: | :-----: |
  | `id` | `number` | The story ID | :heavy_check_mark: |    -    |

  ##### Success Response

  ```json
  {
    "message": "Story fetched successfully",
    "data": {
      "id": 1,
      "title": "The Big Story",
      "writer": "John Doe",
      "synopsis": "A story about a big story",
      "category": "Technology",
      "status": 1,
      "cover": "https://bigstory-api.vercel.app/v1/images/cover.jpg",
      "keywords": [
        { "id": 1, "text": "school" },
        { "id": 2, "text": "fiction" }
      ]
    }
  }
  ```

  ##### Error Response

  - story not found

    **Status:** 404\
    **Status Text:** story not found

  </details>

<!-- End | Get a story -->

<!-- Start | Create a story -->

- <details>
    <summary><h4>Create a story</h4></summary>

  Creates a new story.

  ```http
  POST /stories
  ```

  <!-- ##### Header

  **Authorization:** `Bearer <token>`\
  **Content-Type:** `application/json` -->

  |    Name    |    Type    | Description                                                     |      Required      | Default |
  | :--------: | :--------: | --------------------------------------------------------------- | :----------------: | :-----: |
  |  `title`   |  `string`  | The story title                                                 | :white_check_mark: |    -    |
  |  `writer`  |  `string`  | The story writer                                                | :white_check_mark: |    -    |
  | `synopsis` |  `string`  | The story synopsis                                              | :white_check_mark: |    -    |
  | `category` | `Category` | The story category (one of `Financial`, `Technology`, `Health`) | :white_check_mark: |    -    |
  |  `status`  |  `number`  | The story status (0 for draft, 1 for published)                 | :white_check_mark: |    -    |
  |  `cover`   |  `string`  | The story cover image URL                                       | :white_check_mark: |    -    |

  ##### Success Response

  ```json
  {
    "message": "Story fetched successfully",
    "data": {
      "id": 2,
      "title": "Another Big Story",
      "writer": "John Doe",
      "synopsis": "The Big Stories continues",
      "category": "Technology",
      "status": 0,
      "cover": "https://bigstory-api.vercel.app/v1/images/cover.jpg"
    }
  }
  ```

  ##### Error Response

  <!-- - story not found

    **Status:** 404\
    **Status Text:** story not found -->

  </details>

<!-- End | Create a story -->

<!-- Start | Get chapters story -->

- <details>
    <summary><h4>Get chapters of a story</h4></summary>

  Returns chapters of a story.

  ```http
  GET /stories/:id/chapters
  ```

  ##### Parameters

  | Name |   Type   | Description  |      Required      | Default |
  | :--: | :------: | ------------ | :----------------: | :-----: |
  | `id` | `number` | The story ID | :heavy_check_mark: |    -    |

  ##### Success Response

  ```json
  {
    "message": "story fetched successfully",
    "data": []
  }
  ```

  ##### Error Response

  - story not found

    **Status:** 404\
    **Status Text:** story not found

  </details>

<!-- End | Get chapters story -->

</details>

## Schema

<details>
  <summary><h3>Story</h3></summary>

```ts
type Category = "Financial" | "Technology" | "Health";
type Draft = 0;
type Published = 1;

interface Story {
  id: number;
  title: string;
  writer: string;
  synopsis: string;
  category: Category;
  status: Draft | Published;
  cover: string;
  keywords: Keyword[];
  chapters: Chapter[];
}
```

</details>

<details>
  <summary><h3>Chapter</h3></summary>

```ts
interface Chapter {
  id: number;
  title: string;
  body: string;
  story: Story;
  updatedAt: string;
}
```

</details>

<details>
  <summary><h3>Keyword</h3></summary>

```ts
interface Keyword {
  id: number;
  text: string;
}
```

</details>
