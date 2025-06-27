# To Do

# Big features

# KTLO

1. Fix center alignment of cart count badge icon when in cart

when im on home page, icon is center aligned
when im on any other page, the number in the badge is not center aligned.
the count badge next to shopping cart heading in /cart is also not center aligned

Make sure the number in the count badge is ALWAYS center aligned

2. (DONE) Change occurrences of 'Éternelle' to Leia to match new brand name 

3. (DONE) Create a dedicated contact page. everywhere that currently mentions contact or stay connected should lead to this new contact page.

- app header: currently always routes to a section #contact in landing page, make this route to /contact
- footer in /shop. the contact us button under help section should lead to /contact. the stay connected title in the footer - make this clickable and route to /contact as well.
- in /services book a consultation button should also route to /contact

4. (DONE) Fix All Linting Errors according to Next.js lint rules

- Replace all <a href="/"> with <Link href="/"> and wrap an <a> inside it
- Remove or use any variables that are declared but unused like "colors" and "updateVase"
- Replace unescaped ' with double quotes. For example, replace We'd love to hear from you. with "We'd love to hear from you."

5. (DONE) The font in the Checkout page does not align with the fonts on the rest of the site. This is seen from the Header and the whole Order Summary. Make sure it follows the rest of the site 

6. (DONE) Clicking into the "Shop" page, the title "The Collection" is cut off. The space between the header and the text "Contact Us" is perfect and this amount of space should be used on all the other pages. 

7. More robust admin system in the future

8. Accounts:
- Add sign in with google for the account page 
- Add features for wishlist and order history

9. (DONE) Add a linkage between the "Add to cart" button with backend data that records how much stock there is left for each item, and automatically populate a "Pre-Order" box to appear whenever an item is at zero stock (sold out). 

10. Implement Stripe payment 
- Automatically decrement stock when a sale completes 
- Inventory: Seraphine is showing Out of Stock but https://leia-less.onrender.com/inventory shows it has 10 items 
- When a stock runs out, make the add to cart button become a Preorder button where customers can still be lead to checkout but have a disclaimer that 

11. Implement Stripe Elements later on. Make Checkout page more seamless with Stripe already in it along with checkout summary

12. Thank you for puchase page: 
- (DONE) Ensure font and typography is consistent with the rest of the site 
- Ensure that LEIA button is clickable and brings me back to landing page
- confirmation email gets sent upon successful orders 

13. (DONE) In the About page, make sure that when leia is mentioned, its "Leia" instead of "leia"

14. In each individual product from the shop page, there is an awkward gap at the top of the screen on desktop and on mobile

15. (DONE) In the mobile view, make sure the hamburger icon also has a link for Shop which leads to shop page 

16. When something is added to cart, the pop up that shows the item is added to cart is cut off and blocked by the top header

17. On the landing page, the spacing between each section is too far apart
