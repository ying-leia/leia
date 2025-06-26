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

10. Implement Stripe payment + automatically decrement stock when a sale completes + Add a preorderAvailable boolean to manually control preorder status per item.

11. Implement Stripe Elements later on. Make Checkout page more seamless with Stripe already in it along with checkout summary

12. Ensure confirmation email gets sent upon successful orders 




