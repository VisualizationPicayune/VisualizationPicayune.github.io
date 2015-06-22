//Colour difference ∆E - A survey
//Mokrzycki W.S., Tatol M.
//{mokrzycki,mtatol}@matman.uwm.edu.pl
//Faculty of Mathematics and Informatics
//University of Warmia and Mazury,
//Sloneczna 54, Olsztyn, Poland
//Preprint submitted to Machine Graphic & Vision, //08.10.2012

// Δ
// 3.1 ΔE DN

// In the Munsell color system:
function ΔEDN(C, ΔH, ΔV, ΔC) {
    return 2/5*C * ΔH + 6*ΔH + 3*ΔC
}

// 3.2 Judd ΔE J, Judd-Hunter ΔE NBS
function ΔEJ(ΔL, ΔC) {
    return Math.sqrt(ΔL*ΔL + ΔC*ΔC)
}

