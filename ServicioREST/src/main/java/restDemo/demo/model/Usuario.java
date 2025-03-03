package restDemo.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDate;
//Clase que representa información del individuo(**)
public class Usuario {
    @JsonProperty("usuario")
    private String usuario;
    @JsonProperty("estudios")
    private String estudios;
    @JsonProperty("sexo")
    private String sexo;
    @JsonProperty("nacimiento")
    private LocalDate nacimiento;
    @JsonProperty("fecha")
    private LocalDate fecha;
    @JsonProperty("edad")
    private int edad;

    public Usuario(String usuario, String estudios, String sexo, LocalDate nacimiento, LocalDate fecha, int edad) {
        this.usuario = usuario;
        this.estudios = estudios;
        this.sexo = sexo;
        this.nacimiento = nacimiento;
        this.fecha = fecha;
        this.edad = edad;
    }

    public String getUsuario() {
        return usuario;
    }

    public String getEstudios() {
        return estudios;
    }

    public String getSexo() {
        return sexo;
    }

    public LocalDate getNacimiento() {
        return nacimiento;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public int getEdad() {
        return edad;
    }
}
