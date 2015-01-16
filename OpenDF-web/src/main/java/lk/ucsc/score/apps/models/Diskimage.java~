/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package lk.ucsc.score.apps.models;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author Acer
 */
@Entity
@Table(name = "diskimage")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Diskimage.findAll", query = "SELECT d FROM Diskimage d"),
    @NamedQuery(name = "Diskimage.findByIdDiskImage", query = "SELECT d FROM Diskimage d WHERE d.idDiskImage = :idDiskImage"),
    @NamedQuery(name = "Diskimage.findByName", query = "SELECT d FROM Diskimage d WHERE d.name = :name")})
public class Diskimage implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "idDiskImage")
    private Integer idDiskImage;
    @Size(max = 45)
    @Column(name = "name")
    private String name;
    @JoinColumn(name = "Project_idProject", referencedColumnName = "idProject")
    @ManyToOne(optional = false)
    private Project projectidProject;

    public Diskimage() {
    }

    public Diskimage(Integer idDiskImage) {
        this.idDiskImage = idDiskImage;
    }

    public Integer getIdDiskImage() {
        return idDiskImage;
    }

    public void setIdDiskImage(Integer idDiskImage) {
        this.idDiskImage = idDiskImage;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    @XmlTransient
    public Project getProjectidProject() {
        return projectidProject;
    }
    
    public void setProjectidProject(Project projectidProject) {
        this.projectidProject = projectidProject;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idDiskImage != null ? idDiskImage.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Diskimage)) {
            return false;
        }
        Diskimage other = (Diskimage) object;
        if ((this.idDiskImage == null && other.idDiskImage != null) || (this.idDiskImage != null && !this.idDiskImage.equals(other.idDiskImage))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "lk.ucsc.score.apps.models.Diskimage[ idDiskImage=" + idDiskImage + " ]";
    }
    
}
