package restDemo.demo.model.MOCA;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MOCA4 {
    @JsonProperty("usuario")
    private String usuario;
    @JsonProperty("tiempo")
    private double tiempo=0.0;
    @JsonProperty("audio1")
    private String audio1;
    @JsonProperty("audio2")
    private String audio2;

    public MOCA4(){

    }
    public MOCA4(String usuario, double tiempo, String audio1, String audio2) {
        this.usuario = usuario;
        this.tiempo = tiempo;
        this.audio1 = audio1;
        this.audio2 = audio2;
    }

    public String getAudio1() {
        return audio1;
    }

    public String getAudio2() {
        return audio2;
    }

    public String getUsuario() {
        return usuario;
    }

    public double getTiempo() {
        return tiempo;
    }
}
