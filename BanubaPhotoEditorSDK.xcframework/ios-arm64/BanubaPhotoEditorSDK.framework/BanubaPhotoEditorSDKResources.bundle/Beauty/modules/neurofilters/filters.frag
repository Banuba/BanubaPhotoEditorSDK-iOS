#include <bnb/glsl.frag>

BNB_IN(0) vec2 var_uv;

BNB_DECLARE_SAMPLER_2D(0, 1, tex_input);

vec3 hash(vec2 p)
{
	vec3 p3 = fract(vec3(p.xyx) * vec3(.1031, .1030, .0973));
	p3 += dot(p3, p3.yxz+33.33);
	return fract((p3.xxy+p3.yzz)*p3.zyx);
}

float gauss( float x, float y, float sigma_mult )
{
	return exp( -sigma_mult*(x*x + y*y) );
}

void main()
{
#ifdef BNB_GL_ES_1
	vec4 img = BNB_TEXTURE_2D( BNB_SAMPLER_2D(tex_input), var_uv );
#else
	ivec2 iuv = ivec2(var_uv*bnb_SCREEN.xy);
	vec4 img = texelFetch( BNB_SAMPLER_2D(tex_input), iuv, 0 );
#endif

	float sharpen_amount = filter_noise_strength_monochromatic_sharpen_amount_radius.z;
	if( sharpen_amount != 0. )
	{
		float r = max(1.,filter_noise_strength_monochromatic_sharpen_amount_radius.w*(1280.*bnb_SCREEN.w));
		float sigma = (r*2.-1.)/4.;
		float sigma_mult = 1./(2.*sigma*sigma);

		vec3 blurred = img.rgb;
		float mult_sum = 1.;
#ifdef BNB_GL_ES_1
		for( float y = 0.; y <= r; y += 1. )
		{
			for( float x = 1.; x <= r; x += 1. )
			{
				float mult = gauss(x,y,sigma_mult);
				mult_sum += mult*4.;
				blurred += mult*(
					BNB_TEXTURE_2D( BNB_SAMPLER_2D(tex_input), var_uv + vec2( x, y)*bnb_SCREEN.zw ).rgb + 
					BNB_TEXTURE_2D( BNB_SAMPLER_2D(tex_input), var_uv + vec2(-y, x)*bnb_SCREEN.zw ).rgb +
					BNB_TEXTURE_2D( BNB_SAMPLER_2D(tex_input), var_uv + vec2(-x,-y)*bnb_SCREEN.zw ).rgb +
					BNB_TEXTURE_2D( BNB_SAMPLER_2D(tex_input), var_uv + vec2( y,-x)*bnb_SCREEN.zw ).rgb);
			}
		}
#else
		int ir = int(r);
		ivec2 isz1 = ivec2(bnb_SCREEN.xy) - 1;
		for( int y = 0; y <= ir; ++y )
		{
			for( int x = 1; x <= ir; ++x )
			{
				float mult = gauss(float(x),float(y),sigma_mult);
				mult_sum += mult*4.;
				blurred += mult*(
					texelFetch( BNB_SAMPLER_2D(tex_input), clamp( iuv + ivec2( x, y), ivec2(0), isz1 ), 0 ).rgb + 
					texelFetch( BNB_SAMPLER_2D(tex_input), clamp( iuv + ivec2(-y, x), ivec2(0), isz1 ), 0 ).rgb +
					texelFetch( BNB_SAMPLER_2D(tex_input), clamp( iuv + ivec2(-x,-y), ivec2(0), isz1 ), 0 ).rgb +
					texelFetch( BNB_SAMPLER_2D(tex_input), clamp( iuv + ivec2( y,-x), ivec2(0), isz1 ), 0 ).rgb);
			}
		}
#endif

		blurred *= 1./mult_sum;

		img.rgb += (img.rgb-blurred)*sharpen_amount;
	}

	float brightness = filter_brightness_contrast_saturation.x/255.;
	float contrast = 1. + filter_brightness_contrast_saturation.y/255.;

	img.rgb = ( img.rgb - 0.5 )*contrast + 0.5 + brightness;

	float noise_strength = filter_noise_strength_monochromatic_sharpen_amount_radius.x;
	if( noise_strength != 0. )
	{
		float monochromatic = filter_noise_strength_monochromatic_sharpen_amount_radius.y;
		vec3 noise = hash(var_uv*bnb_SCREEN.xy)*2.-1.;
		noise = noise*filter_noise_strength_monochromatic_sharpen_amount_radius.x;
		noise = mix( noise, noise.xxx, monochromatic );
		img.rgb += noise;
	}

	float saturation = 1. + filter_brightness_contrast_saturation.z/100.;
	img.rgb = mix( vec3(dot(img.rgb,vec3(0.299,0.587,0.114))), img.rgb, saturation );

	bnb_FragColor = img;
}
