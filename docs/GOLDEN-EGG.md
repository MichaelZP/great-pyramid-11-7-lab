# Golden Φ Egg

Golden Egg is a separate preset defined by a planar section of the surface of
revolution `zr=1`, where `r=√(x²+y²)`. The cutting plane is
`z=Z₀+x tan θ`, with the adopted parameter `Z₀=7.65`.

Solving `L/W=φ` numerically near 51.8° gives
`θ≈51.795319255897588°`. The stored preset is rounded to
`51.795319256°`; its relative L/W residual is below `1e-11`, rather than
exactly zero. No proof of global uniqueness over the full domain is supplied.
The condition defines the preset; it is not an independent confirmation of φ.

## Section calculation

With `t=tan θ`, the closed oval around `Z₀` has endpoints
`zLo=(Z₀+√(Z₀²−4t))/2` and `zHi=(Z₀+√(Z₀²+4t))/2`, provided
`Z₀²>4t>0`. The smaller root belongs to a separate unbounded component.
In the plane, `y²=1/z²−((z−Z₀)/t)²` and
`L=(zHi−zLo)/sin θ`. The engine searches the maximum of `y²` to obtain
`W=2√max(y²)`; no integration or calibration rescale is needed.

This section is an **oval, not an ellipse**. The independent audit solves
`z³(Z₀−z)=t²` to find its unique maximum width. Uniqueness of this width
does not establish uniqueness of the golden angle.

The pyramid preset takes this angle as its face slope:
`H/A=tan θ`, `B/H=2/tan θ≈1.574109391`.
For 11:7, L/W is `≈1.619742960852462`, with relative error
`≈0.105620285%` against φ, outside the declared 0.1% comparison threshold.

## Scene and evidence

The ordinary translucent cone and revolved egg are an artistic illustration
with framing parameters different from the numerical `Z₀=7.65` section.
Their apparent ratio is not evidence for the numeric row. Selecting **L/W**
shows the actual closed section, its cutting plane, endpoints, length and
maximum width, using uniform scaling and translation only.

The Golden Egg preset matches **10/13** comparisons at 0.1%; its mean error
is approximately **0.090%**, maximum **0.397%**. The largest errors are
e−1, e and π. These are dependent comparisons, not independent discoveries.
The source workbooks evaluate only twelve rows in their main error tables.

The modern proposal does not establish a physical function or builders’
intent. The surface, `Z₀`, weights and angle reference are adopted project
inputs. See the [independent audit](matematyka-13-stalych.md) and
[history with scoped sources](HISTORY-13.md).
