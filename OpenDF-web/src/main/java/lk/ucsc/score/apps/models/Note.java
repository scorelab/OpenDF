/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package lk.ucsc.score.apps.models;

import java.io.Serializable;
import java.util.Collection;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author Acer
 */
@Entity
@Table(name = "Note")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Note.findAll", query = "SELECT u FROM Note u"),
    @NamedQuery(name = "Note.findByIdNote", query = "SELECT u FROM Note u WHERE u.idNote = :idNote"),
    @NamedQuery(name = "Note.findByIdFile", query = "SELECT u FROM Note u WHERE u.idFile = :idFile"),
    @NamedQuery(name = "Note.findByIdProject", query = "SELECT u FROM Note u WHERE u.idProject.idProject = :idProject"),
})

public class Note implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "idNote")
    private Integer idNote;
    @Size(max = 500)
    @Column(name = "description")
    private String description;
    @JoinColumn(name = "idFile", referencedColumnName = "idFile")
    @ManyToOne(optional = false)
    private File idFile;
    @JoinColumn(name = "idProject", referencedColumnName = "idProject")
    @ManyToOne(optional = false)
    private Project idProject;


    public Note() {
    }

    public Note(Integer idNote) {
        this.idNote = idNote;
    }

    public Integer getIdNote() {
        return idNote;
    }

    public void setIdNote(Integer idNote) {
        this.idNote = idNote;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Project getIdProject() {
        return idProject;
    }

    public void setIdProject(Project idProject) {
        this.idProject = idProject;
    }

    public File getIdFile() {
        return idFile;
    }

    public void setIdFile(File idFile) {
        this.idFile = idFile;
    }


    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idNote != null ? idNote.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        if (!(object instanceof Note)) {
            return false;
        }
        Note other = (Note) object;
        if ((this.idNote == null && other.idNote != null) || (this.idNote != null && !this.idNote.equals(other.idNote))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "lk.ucsc.score.apps.models.Note[ idNote=" + idNote + " ]";
    }
}
