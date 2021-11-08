#version 410

uniform float lightIntensity;
uniform bool blinnPhong;
uniform float shininess;
uniform float eta;
uniform sampler2D shadowMap;

in vec4 eyeVector;
in vec4 lightVector;
in vec4 vertColor;
in vec4 vertNormal;
in vec4 lightSpace;

out vec4 fragColor;

vec4 ambient() {
     float ambient_coeff = 0.8;
     return ambient_coeff * vertColor * lightIntensity;
}

vec4 diffuse() {
     float diffuse_coeff = 1;
     return diffuse_coeff * lightIntensity * max(dot(vertNormal, lightVector), 0) * vertColor;
}

float fresnel( vec4 eyeVector, vec4 lightVector, vec4 halfVector ) {
     float cosTheta = dot(halfVector, lightVector);
     float c_i = sqrt(eta * eta + cosTheta * cosTheta - 1);
     float fresnel_s = pow((cosTheta - c_i)/(cosTheta + c_i), 2);
     float fresnel_p = pow((eta*eta*cosTheta - c_i)/(eta*eta*cosTheta + c_i), 2);
     float fresnel = (fresnel_s + fresnel_p) / 2;

     return fresnel;
}

vec4 specular_phong() {
     vec4 halfVector = normalize(eyeVector + lightVector);
     return fresnel(eyeVector, lightVector, halfVector) * lightIntensity * pow(max(dot(halfVector, vertNormal), 0), shininess) * vertColor;
}

float ggx(vec4 vec_1, vec4 vec_2) {
     float cosTheta = dot
}

void main( void )
{
     vec4 ambientColor = ambient();
     vec4 diffuseColor = diffuse();
     vec4 specularColor = (blinnPhong) ? specular_phong() : vec4(0.0, 0.0, 0.0, 0.0);

     fragColor = ambientColor + diffuseColor + specularColor;
}