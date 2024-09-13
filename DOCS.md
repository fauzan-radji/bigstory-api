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
        "cover": "https://bigstory-api.vercel.app/v1/images/cover.jpg"
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
    "message": "story fetched successfully",
    "data": {}
  }
  ```

  ##### Error Response

  - story not found

    **Status:** 404\
    **Status Text:** story not found

  </details>

<!-- End | Get a story -->

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
type Draft = 0;
type Published = 1;

interface Story {
  id: number;
  title: string;
  writer: string;
  synopsis: string;
  category: "Financial" | "Technology" | "Health";
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
