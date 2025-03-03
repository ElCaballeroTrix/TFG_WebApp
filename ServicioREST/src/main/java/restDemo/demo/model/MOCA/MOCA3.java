package restDemo.demo.model.MOCA;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MOCA3 {
    @JsonProperty("usuario")
    private String usuario;
    @JsonProperty("tiempo")
    private double tiempo=0.0;
    @JsonProperty("imagenIzq")
    private String imageIzq;
    @JsonProperty("imagenCentro")
    private String imageCentro;
    @JsonProperty("imagenDer")
    private String imageDer;

    public MOCA3(String usuario, double tiempo, String imageIzq, String imageCentro, String imageDer) {
        this.usuario = usuario;
        this.tiempo = tiempo;
        this.imageIzq = imageIzq;
        this.imageCentro = imageCentro;
        this.imageDer = imageDer;
    }

    public String getUsuario() {
        return usuario;
    }

    public double getTiempo() {
        return tiempo;
    }

    public String getImageIzq() {
        return imageIzq;
    }

    public String getImageCentro() {
        return imageCentro;
    }

    public String getImageDer() {
        return imageDer;
    }
}
