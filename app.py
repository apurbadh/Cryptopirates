from flask import Flask, session, url_for, redirect, render_template, request
from flask_sqlalchemy import SQLAlchemy 
from datetime import datetime, date 
from random import randint

hello = ''
app = Flask(__name__)
db = SQLAlchemy(app)
app.secret_key = "alpha-vega"
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///Users.sqlite3'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['SQLALCHEMY_BINDS'] = { 'countdown' : 'sqlite:///keeptime.sqlite3'}


def timeleft(datethen, timethen):
	allTime = datethen + ' ' + timethen
	allDatethen = datetime.strptime(allTime, '%Y-%m-%d %H:%M')
	presentTime = datetime.now()
	presentTime = presentTime.strftime('%Y-%m-%d %H:%M')
	presentTime = datetime.strptime(presentTime, '%Y-%m-%d %H:%M')
	final = allDatethen - presentTime
	return final




class Users(db.Model):
	_id = db.Column("id", db.Integer, primary_key=True)
	btcacc = db.Column(db.String(36))
	referal = db.Column(db.String(6))
	totalam = db.Column(db.String(100))
	refam = db.Column(db.String(100))
	referedBy = db.Column(db.String(36))
	combalance = db.Column(db.String(100))

	def __init__(self, btcacc, referedBy):
		self.btcacc = btcacc
		self.referal = f"{randint(100000, 999999)}"
		self.totalam = '0'
		self.refam = '0' 
		self.referedBy = referedBy
		self.combalance = '0'


class keeptime(db.Model):
	__bind_key__ = 'countdown'
	_id = db.Column('id', db.Integer, primary_key=True)
	startdate = db.Column(db.String(100))
	enddate = db.Column(db.String(100))
	btcacc = db.Column(db.String(35))
	depoam = db.Column(db.String(100))
	proam = db.Column(db.String(100))
	endd = db.Column(db.String(25))

	def __init__(self, startdate, enddate, btcacc, depoam, proam, endd):
		self.startdate = startdate
		self.enddate = enddate
		self.btcacc = btcacc
		self.depoam = depoam
		self.proam = proam
		self.endd = endd


		
@app.route('/')
def homepage():
	if "logged" not in session or not session['logged']:
		return redirect('/login/new')
	name = session['name']
	usr = Users.query.filter_by(btcacc=name).first()
	trefam = usr.refam
	totalam = usr.totalam
	totcom = usr.combalance
	return render_template('dashboard.html', name=name, mem=trefam, totalam=totalam, totcom=totcom)


@app.route('/logout')
def logout():
	session['logged'] = False
	return redirect('/')


@app.route('/login/<referal>', methods = ['POST', 'GET'])
def index(referal):	
	if request.method == 'POST':
		usracc = request.form['wallet']
		session['logged'] = True
		session['name'] = usracc
		refLink = request.referrer[-6:]
		usr = Users.query.filter_by(btcacc=usracc).first()
		if not usr:
			try:
				test = int(refLink)
			except:
				refLink = 'new'
			usr = Users(usracc, refLink)
			db.session.add(usr)
			anoUser = Users.query.filter_by(referal=refLink).first()
			if anoUser:
				anoUser.refam = f"{int(anoUser.refam) + 1}"
			db.session.commit()
		return redirect('/')

	return render_template('index.html')


	return render_template('index.html')

@app.route('/faq')
def faq():
	return render_template('faq.html')

@app.route('/stats')
def stats():
	return render_template('stats.html')

@app.route('/contact')
def contact():
	return render_template('contact.html')

@app.route('/agreement')
def agreement():
	return render_template('agreement.html')


@app.route('/makedeposit', methods = ['POST', 'GET'])
def makedeposite():
	if "logged" not in session or not session['logged']:
		return redirect('/login/new')
	if request.method == 'POST':
		theam = request.form['invamount']
		session['theam'] = theam
		return redirect('/depositconf')
	return render_template('makedeposit.html')

@app.route('/mydeposit')
def mydeposite():
	if "logged" not in session or not session['logged']:
		return redirect('/login/new')
	foundacc = keeptime.query.filter_by(btcacc=session['name']).first()
	startd = ''
	endd = ''
	depam = ''
	proam = ''
	endl = ''
	countdown = ''
	if foundacc:
		startd = foundacc.startdate
		endd = foundacc.enddate
		endl = foundacc.endd
		depam = foundacc.depoam
		proam = foundacc.proam 
		countdown = timeleft(startd, endd)
		timead = startd + ' ' + endd
		finishIndate = datetime.strptime(timead, '%Y-%m-%d %H:%M')
		isFinished = finishIndate <= datetime.now()
		if isFinished:
			foundUsr = Users.query.filter_by(btcacc=session['name']).first()
			foundUsr.totalam = f"{float(foundUsr.totalam) + float(proam) + float(depam)}"
			anoUser = Users.query.filter_by(btcacc=foundUsr.referedBy)
			if anouser:
				anoUser.combalance = f"{float(anoUser.combalance) + (float(proam)/10)}"
			db.session.delete(foundacc)
			db.session.commit()

	return render_template('mydeposits.html', foundacc=foundacc, startd=startd, endd=endl, inam=depam, proam=proam, countdown=countdown)

@app.route('/transaction')
def transaction():
	if "logged" not in session or not session['logged']:
		return redirect('/login/new')
	return render_template('transactions.html')

@app.route('/referal')
def refferal():
	if "logged" not in session or not session['logged']:
		return redirect('/login/new')
	user = Users.query.filter_by(btcacc=session['name']).first()
	anouser = Users.query.filter_by(referal=user.referedBy).first()
	if not anouser: gotRef = None
	else: gotRef = anouser.btcacc
	refam = user.refam
	totalam = user.combalance
	if gotRef == 'new' or not gotRef:
		toadd = None
	else: toadd = f"You were reffred by {gotRef}"
	return render_template('refferal.html', ref=f"www.cryptopirates.tk/login/{user.referal}", reffered=toadd, refam=refam, totalam=totalam)

@app.route('/depositconf', methods = ['POST', 'GET'])
def depositeconf():
	if ("logged" not in session or not session['logged']) and 'theam' not in session:
		return redirect('/')
	theam = session['theam']
	return render_template('depositconf.html', deam=theam)



@app.route('/admin', methods= ['POST', 'GET'])
def admin():
	if 'adminacess' not in session:
		return redirect('/adminlogin')
	mes = 'Write the address and amount to add.'
	if request.method == 'POST':
		btcnm = request.form['btcnum']
		addval = request.form['addv']
		usr = Users.query.filter_by(btcacc=btcnm).first()
		if not usr:
			return render_template('admin.html', mes='The account is not in the database')
		addval = float(addval)
		anoval = float(usr.totalam)
		usr.totalam = str(anoval + addval)
		db.session.commit()
		mes = 'Done'

	return render_template('admin.html')


@app.route('/addcom', methods=['POST', 'GET'])
def addcom():
	if request.method == 'POST':
		btcnm = request.form['btcnum']
		addval = float(request.form['addv'])
		usr = Users.query.filter_by(btcacc=btcnm).first()
		if usr and usr.referedBy != 'new' and usr.referedBy:
			anouser = Users.query.filter_by(referal=usr.referedBy).first()
			oldam = float(anouser.combalance)
			anouser.combalance = oldam + addval/10
		oldoval = float(usr.totalam)
		usr.totalam = str(oldoval + addval)
		db.session.commit()
		return redirect('/admin')
	return redirect('/')



@app.route('/adminlogin', methods = ['POST', 'GET'])
def adminlogin():
	if request.method == 'POST':
		username = request.form['usrnm']
		passwd = request.form['passwd']
		if username == 'amir' and passwd == 'alpha-vega':
			session['adminacess'] = True
			return redirect('/admin')
	return render_template('adminlog.html')


@app.route('/addtime', methods = ['POST', 'GET'])
def addtime():
	if request.method == 'POST':
		startdate = request.form['stdate']
		enddate = request.form['enddate']
		btcad = request.form['btac']
		depam = request.form['deam']
		proam = request.form['pam']
		endd = datetime.now()
		enddl = datetime.strftime(endd, "%Y-%m-%d")
		addtime = keeptime(startdate, enddate, btcad, depam, proam, enddl)
		db.session.add(addtime)
		db.session.commit()
		return redirect('/')
	return redirect('/admin')


if __name__ == "__main__":
	db.create_all()
	app.run()