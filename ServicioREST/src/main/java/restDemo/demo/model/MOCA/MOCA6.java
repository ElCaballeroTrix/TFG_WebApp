package restDemo.demo.model.MOCA;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MOCA6 {
    @JsonProperty("usuario")
    private String usuario;
    @JsonProperty("tiempo")
    private double tiempo=0.0;
    @JsonProperty("audio1")
    private String audio1;
    @JsonProperty("audio2")
    private String audio2;
    @JsonProperty("audio3")
    private String audio3;
    @JsonProperty("pareja1")
    private String pareja1;
    @JsonProperty("pareja2")
    private String pareja2;

    public MOCA6(){

    }
    public MOCA6(String usuario, double tiempo, String audio1, String audio2, String audio3, String pareja1, String pareja2) {
        this.usuario = usuario;
        this.tiempo = tiempo;
        this.audio1 = audio1;
        this.audio2 = audio2;
        this.audio3 = audio3;
        this.pareja1 = pareja1;
        this.pareja2 = pareja2;
    }

    public String getUsuario() {
        return usuario;
    }

    public double getTiempo() {
        return tiempo;
    }

    public String getAudio1() {
        return audio1;
    }

    public String getAudio2() {
        return audio2;
    }

    public String getAudio3() {
        return audio3;
    }

    public String getPareja1() {
        return pareja1;
    }

    public String getPareja2() {
        return pareja2;
    }
}
