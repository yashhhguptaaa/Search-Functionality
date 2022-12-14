## Deployed Link:

[https://searching-red.vercel.app/](https://searching-red.vercel.app/)

## Technologies Used:

1. React.js
2. TypeScript
3. Axios

## Features:

1. Debouncing: It is a programming practice used to ensure that time-consuming tasks do not fire so often, that it stalls the performance of the web page. For example, if the user types abc, the query goes to the api. Meanwhile, if the user types abcde before 200ms, then the previous API call would be canceled. And after 200ms, the API will call for the abcde.

2. Abort Controller for cancelling previous request.

3. Pagination: The list of search results would show in a paginated view with 5 results per page on server side.

4. Caching: This would cache older searches.

5. Previous and Next button to allow users to load the next set of results.

6. The search results are coming from an api [https://search-functionality-backend.vercel.app/](https://search-functionality-backend.vercel.app/) .

7. Added animation for different components using AOS.

8. Added test for all the components.

9. ReactJS Accessibility: Accessibility is the necessary tool or ways in which a website can be made easy to access by the user with features like clickable buttons or dropdowns or spaces to write a comment and stuff. 

10. Fully responsive and clean UI.

## Open-Source packages / libraries used:

1. [sass](https://github.com/sass/sass) : I've used sass for all the css in this project.

2. [AOS](https://github.com/michalsnik/aos) : I've used this for adding animation like fade-up, fade-down etc.