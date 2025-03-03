package restDemo.demo.model.MOCA;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MOCA5 {
    @JsonProperty("usuario")
    private String usuario;
    @JsonProperty("tiempo")
    private double tiempo=0.0;
    @JsonProperty("audio1")
    private String audio1;
    @JsonProperty("audio2")
    private String audio2;
    @JsonProperty("numeroDeA")
    private int numeroDeA;
    @JsonProperty("resta7_1")
    private int resta7_1;
    @JsonProperty("resta7_2")
    private int resta7_2;
    @JsonProperty("resta7_3")
    private int resta7_3;
    @JsonProperty("resta7_4")
    private int resta7_4;
    @JsonProperty("resta7_5")
    private int resta7_5;

    public MOCA5(){

    }
    public MOCA5(String usuario, double tiempo, String audio1, String audio2, int numeroDeA, int resta7_1, int resta7_2, int resta7_3, int resta7_4, int resta7_5) {
        this.usuario = usuario;
        this.tiempo = tiempo;
        this.audio1 = audio1;
        this.audio2 = audio2;
        this.numeroDeA = numeroDeA;
        this.resta7_1 = resta7_1;
        this.resta7_2 = resta7_2;
        this.resta7_3 = resta7_3;
        this.resta7_4 = resta7_4;
        this.resta7_5 = resta7_5;
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

    public int getNumeroDeA() {
        return numeroDeA;
    }

    public int getResta7_1() {
        return resta7_1;
    }

    public int getResta7_2() {
        return resta7_2;
    }

    public int getResta7_3() {
        return resta7_3;
    }

    public int getResta7_4() {
        return resta7_4;
    }

    public int getResta7_5() {
        return resta7_5;
    }
}
