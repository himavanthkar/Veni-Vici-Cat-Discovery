# Web Development Project 4 - Veni Vici Cat Discovery

Submitted by: **Himavant Kerpurapu**

This web app: **A StumbleUpon-style discovery app that allows users to explore random cat breeds from around the world. Users can click through different cat breeds, learn about their characteristics, and customize their experience by banning specific attributes they don't want to see.**

Time spent: **6** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **Application features a button that creates a new API fetch request on click and displays at least three attributes and an image obtained from the returned JSON data**
  - The type of attribute displayed for each image should be consistent across API calls (i.e. if you are using a cat API, and display the color, breed, and age in response to an initial API call, subsequent button clicks should also result in the color, breed, and age being displayed)
- [x] **Only one item/data from API call response is viewable at a time and at least one image is displayed per API call**
  - A single result of an API call is displayed at a time
  - Displayed attributes should match the displayed image (i.e., if showing a picture of a Siamese cat and the attribute breed, the displayed breed should be 'Siamese' not 'Ragdoll' or another breed that doesn't match)
  - There is at least one image per API call
- [x] **API call response results should appear random to the user**
  - Clicking on the API call button should generate a seemingly random new result each time
  - Note: Repeat results are permitted but the API used should have a reasonably large amount of data and repeats should not be frequent
- [x] **Clicking on a displayed value for one attribute adds it to a displayed ban list**
  - At least one attribute for each API result should be clickable
  - Clicking on a clickable attribute not on the ban list, should immediately add it to the ban list
  - Clicking on an attribute in the ban list should immediately remove it from the ban list
- [x] **Attributes on the ban list prevent further images/API results with that attribute from being displayed**
  - Clicking on the API call button should not result in any image/attributes with attribute values in the ban list being displayed (ex. Using a cat API, if the ban list includes the value 'Siberian' for the breed attribute, clicking on the Discover button should never result in a Siberian cat being displayed)
  - Note: More attribute values on the ban list may result in a higher frequency of repeat results
- [x] **To ensure an accurate grade, your recording must show that when clicked, an attribute in the ban list is immediately removed from the list of banned attributes**

The following **optional** features are implemented:

- [x] Multiple types of attributes are clickable and can be added to the ban list
- [x] Users can see a stored history of their previously displayed results from this session
  - A dedicated section of the application displays all the previous images/attributes seen before
  - Each time the API call button is clicked, the history updates with the newest API result

The following **additional** features are implemented:

- [x] **Modern, Responsive UI**: Beautiful gradient design with smooth animations and hover effects
- [x] **Loading States**: Visual spinner animation during API calls with proper error handling
- [x] **Session Management**: History tracking with timestamps and image thumbnails
- [x] **Smart Filtering**: Case-insensitive ban list filtering with retry logic for failed requests
- [x] **Mobile Responsive**: Fully responsive design that works on desktop and mobile devices

## Video Walkthrough

Here's a walkthrough of implemented user stories:

[Video Walkthrough GIF created with ...]

## Notes

Describe any challenges encountered while building the app.

**Challenges Encountered:**
- **API Rate Limiting**: The Cat API has rate limits, so I implemented retry logic and error handling to gracefully handle failed requests
- **Ban List Filtering**: Ensuring that banned attributes are properly filtered out while maintaining randomness required careful logic to avoid infinite loops
- **Image Loading**: Some cat breeds don't have images available, so I implemented fallback handling with placeholder images
- **State Management**: Managing the ban list, history, and current cat state required careful coordination to ensure UI consistency
- **Responsive Design**: Creating a layout that works well on both desktop and mobile required extensive CSS Grid and Flexbox adjustments

## License

Copyright [2024] [Himavant Kerpurapu]

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License. 