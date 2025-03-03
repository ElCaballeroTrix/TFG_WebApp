package restDemo.demo.model.MOCA;

import com.fasterxml.jackson.annotation.JsonProperty;



public class MOCADatos {
    @JsonProperty("MOCA1")
    private MOCA1 moca1;
    @JsonProperty("MOCA2")
    private MOCA2 moca2;
    @JsonProperty("MOCA3")
    private MOCA3 moca3;
    @JsonProperty("MOCA4")
    private MOCA4 moca4;
    @JsonProperty("MOCA5")
    private MOCA5 moca5;
    @JsonProperty("MOCA6")
    private MOCA6 moca6;
    @JsonProperty("MOCA7")
    private MOCA7 moca7;

    public MOCADatos(){

    }

    public MOCADatos(MOCA1 moca1, MOCA2 moca2, MOCA3 moca3, MOCA4 moca4, MOCA5 moca5, MOCA6 moca6, MOCA7 moca7) {
        this.moca1 = moca1;
        this.moca2 = moca2;
        this.moca3 = moca3;
        this.moca4 = moca4;
        this.moca5 = moca5;
        this.moca6 = moca6;
        this.moca7 = moca7;
    }


    public MOCA1 getMoca1() {
        return moca1;
    }

    public void setMoca1(MOCA1 moca1) {
        this.moca1 = moca1;
    }

    public MOCA2 getMoca2() {
        return moca2;
    }

    public void setMoca2(MOCA2 moca2) {
        this.moca2 = moca2;
    }

    public MOCA3 getMoca3() {
        return moca3;
    }

    public void setMoca3(MOCA3 moca3) {
        this.moca3 = moca3;
    }

    public MOCA4 getMoca4() {
        return moca4;
    }

    public void setMoca4(MOCA4 moca4) {
        this.moca4 = moca4;
    }

    public MOCA5 getMoca5() {
        return moca5;
    }

    public void setMoca5(MOCA5 moca5) {
        this.moca5 = moca5;
    }

    public MOCA6 getMoca6() {
        return moca6;
    }

    public void setMoca6(MOCA6 moca6) {
        this.moca6 = moca6;
    }

    public MOCA7 getMoca7() {
        return moca7;
    }

    public void setMoca7(MOCA7 moca7) {
        this.moca7 = moca7;
    }
}
