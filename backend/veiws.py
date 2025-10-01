from flask import Blueprint,render_template,redirect,url_for ,session
from flask_login import login_required,current_user
from .auth import session


veiws=Blueprint("veiws",__name__)
@veiws.route('/')
def home():
    existing_user=session
    return render_template('homepage.html',user=current_user)
@veiws.route('/products')
def products():
    return render_template('products.html')
@veiws.route('/ordernow')

def ordernow():
    username = session.get("username")
    email = session.get("email")

    if not username or not email:
         return redirect(url_for("auth.login"))

    return render_template('ordernow.html')
@veiws.route('/cart')
def cart():
    return render_template('cart.html')
@veiws.route('/payment')
def payment():
    username = session.get("username")
    email = session.get("email")

    if not username or not email:
        return redirect(url_for("auth.login"))
        
    return render_template('payment.html')
@veiws.route('/contactus')
def contact():
    username = session.get("username")
    email = session.get("email")

    if not username or not email:
        return redirect(url_for('auth.login'))
    else:
        return render_template('contactus.html', username=username, email=email)

@veiws.route('/aboutus')
def about():
    return render_template('aboutus.html')
@veiws.route('/profile')
def profile():
    username = session.get("username")
    email = session.get("email")

    if not username or not email:
        return redirect(url_for('auth.login'))
    else:
        return render_template('profile.html', username=username, email=email)
@veiws.route('/dashboard')
def dashboard():
    return render_template('homepage.html')

@veiws.route('/order')
def order():
    return render_template('order.html')

