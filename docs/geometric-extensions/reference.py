import json, sys
from mpmath import mp, mpf, sqrt, atan, degrees, pi, findroot
mp.dps = 40
phi=(1+sqrt(5))/2
def oval(t,z0):
    a=(-z0+sqrt(z0**2-4*t))/(2*t); b=(-z0+sqrt(z0**2+4*t))/(2*t)
    xm=findroot(lambda x: x*(z0+t*x)**3+t,(a+b)/2 if False else a/2)
    W=2*sqrt(1/(z0+t*xm)**2-xm**2); L=(b-a)*sqrt(1+t**2)
    return a,b,xm,L,W
f=lambda x: float(x)
B,H=mpf(11),mpf(7); A=B/2; S=sqrt(H**2+A**2); t=H/A; r=A*H/(A+S)
ref={"source":"mpmath 40 digits, independent of the app code (docs/geometric-extensions/reference.py)","model":{"B":11,"H":7,"A":5.5,"S":f(S),"t":f(t),"thetaDeg":f(degrees(atan(t)))},
 "eggLimit":{"limitSA":f(S/A),"phi":f(phi),"errorLimitPhiPct":f(100*(S/A/phi-1)),"z0Min":f(2*sqrt(t)),"thetaGoldenMaxDeg":f(degrees(atan(sqrt(phi)))),"sections":[]},
 "inSphere":{"r":f(r),"OI":f(r),"VI":f(H-r),"VIoverOI":f((H-r)/r),"errorVIOIPhiPct":f(100*((H-r)/r/phi-1)),"MT":f(A),"VT":f(S-A),"MToverVT":f(A/(S-A)),"errorMTVTPhiPct":f(100*abs(A/(S-A)/phi-1)),"VIoverVO":f((H-r)/H),"T":{"alongBase":f(A-A*A/S),"height":f(A*H/S)},"rSceneBase2":f(r*2/11)},
 "why117":{"twoBoverH":f(2*B/H),"errorPiPct":f(100*(2*B/H/pi-1)),"SA":f(S/A),"errorPhiPct":f(100*(S/A/phi-1)),"cfSqrtPhi":[1,3,1,2,11,3],"cfFourOverPi":[1,3,1,1,1,15],"intervalPi":[f(pi*(1-mpf('0.001'))/2),f(pi*(1+mpf('0.001'))/2)],"intervalPhi":[f(2/sqrt(phi**2*(1+mpf('0.001'))**2-1)),f(2/sqrt(phi**2*(1-mpf('0.001'))**2-1))]}}
for z0 in ['7.65','15.3','30.6']:
    a,b,xm,L,W=oval(t,mpf(z0))
    ref["eggLimit"]["sections"].append({"z0":float(z0),"a":f(a),"b":f(b),"xWmax":f(xm),"L":f(L),"W":f(W),"LW":f(L/W),"errorPhiPct":f(100*(L/W/phi-1))})
json.dump(ref,open(sys.argv[1],'w'),indent=1); print(json.dumps(ref["eggLimit"]["sections"][0]))
